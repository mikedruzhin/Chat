import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import MessageForm from './messagesList.jsx';
import { useGetChannelsQuery } from '../services/channelsApi';
import { setActiveChannelId, showModal, hideModal } from './slices/appSlice.js';
import getModal from './Modal/index.js';
import socket from '../utils/socket.js';

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
    data: channels, refetch, error: getChannelsError, isLoading,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const appInfo = useSelector((state) => state.appControl);
  const { activeChannelId } = appInfo;
  const onHide = () => dispatch(hideModal());

  useEffect(() => {
    if (getChannelsError) {
      toast.error(t('toast.errorNetwork'));
      throw getChannelsError;
    }
  }, [dispatch, getChannelsError, t]);

  useEffect(() => {
    function newChannelFunc() {
      refetch();
    }

    function renameChannelFunc(editedChannel) {
      refetch();
      if (editedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId(editedChannel.id));
      }
    }

    function removeChannelFunc(removedChannel) {
      refetch();
      if (removedChannel.id === activeChannelId) {
        dispatch(setActiveChannelId('1'));
      }
    }

    socket.on('newChannel', newChannelFunc);
    socket.on('renameChannel', renameChannelFunc);
    socket.on('removeChannel', removeChannelFunc);

    return () => {
      socket.off('newChannel', newChannelFunc);
      socket.off('renameChannel', renameChannelFunc);
      socket.off('removeChannel', removeChannelFunc);
    };
  }, [activeChannelId, dispatch, refetch]);

  if (isLoading) {
    return (<p>{t('loading.text')}</p>);
  }

  const setClasses = (cur) => {
    const channelClasses = cn('w-100', 'rounded-0', 'text-start', {
      'text-truncate': cur.removable,
      btn: true,
      'btn-secondary': cur.id === activeChannelId,
    });
    return channelClasses;
  };

  const renderChannelName = (channel) => (
    <button
      type="button"
      onClick={() => dispatch(setActiveChannelId(channel.id))}
      className={setClasses(channel)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const renderNavs = (channel) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      {renderChannelName(channel)}
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

  return (
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
                  : renderChannelName(channel)}
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
