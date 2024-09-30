import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import MessageForm from './MessagesList.jsx';
import { useGetChannelsQuery, channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';
import { setActiveChannelId, showModal, hideModal } from '../slices/appSlice.js';
import getModal from './Modal/index.js';
import { defaultChannelId } from '../utils/defaultChannel.js';
import renderChannel from '../utils/renderChannel.js';
import routes from '../utils/routes.js';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';

const renderModals = ({
  appInfo, channels, onHide,
}) => {
  const { modalInfo } = appInfo;
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component channels={channels} onHide={onHide} modalInfo={modalInfo} />;
};

const ChannelsForm = () => {
  const {
    data: channels, error: channelsError, isLoading,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const appInfo = useSelector((state) => state.appControl);
  const socket = useSocket();
  const { activeChannelId } = appInfo;
  const onHide = () => dispatch(hideModal());

  useEffect(() => {
    if (channelsError) {
      toast.error(t('toast.errorNetwork'));
      auth.logOut();
      navigate(routes.login);
    }
  }, [dispatch, channelsError, t, navigate, auth]);

  useEffect(() => {
    const newChannelFunc = (newChannel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(newChannel);
      }));
    };

    const renameChannelFunc = (editedChan) => {
      console.log(editedChan);
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const newChan = draft
          .map(({ name, id }) => (id === editedChan.id ? editedChan.name : name));
        return newChan;
      }));
    };

    const removeChannelFunc = (removedChannel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => (
        draft.filter(({ id }) => id !== removedChannel.id))));
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => (
        draft.filter(({ channelId }) => channelId !== removedChannel.id))));
      if (removedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId(defaultChannelId));
      }
    };

    socket.on('newChannel', newChannelFunc);
    socket.on('renameChannel', renameChannelFunc);
    socket.on('removeChannel', removeChannelFunc);

    return () => {
      socket.off('newChannel', newChannelFunc);
      socket.off('renameChannel', renameChannelFunc);
      socket.off('removeChannel', removeChannelFunc);
    };
  }, [activeChannelId, dispatch, socket]);

  const renderNavs = (channel) => {
    const setActiveChannel = () => dispatch(setActiveChannelId(channel.id));
    console.log(activeChannelId);
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        {renderChannel(channel, setActiveChannel, activeChannelId)}
        <Dropdown.Toggle
          split
          className="flex-grow-0"
          variant={channel.id === activeChannelId ? 'secondary' : 'none'}
          id="dropdown-split-basic"
        >
          <span className="visually-hidden">{t('mainPage.channelMenu')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(showModal({ type: 'removing', item: channel }))}>{t('mainPage.deleteChannel')}</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(showModal({ type: 'renaming', item: channel }))}>{t('mainPage.renameChannel')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return isLoading ? (<p>{t('mainPage.isLoading')}</p>) : (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('mainPage.channels')}</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(showModal({ type: 'adding', item: null }))}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels?.map((channel) => (
              <li className="nav-item w-100" key={channel.id}>
                {channel.removable
                  ? renderNavs(channel)
                  : renderChannel(
                    channel,
                    () => dispatch(setActiveChannelId(channel.id)),
                    activeChannelId,
                  )}
              </li>
            ))}
          </ul>
        </div>
        <MessageForm activeChannelId={activeChannelId} channels={channels} />
      </div>
      {renderModals({
        appInfo, channels, onHide,
      })}
    </div>
  );
};

export default ChannelsForm;
