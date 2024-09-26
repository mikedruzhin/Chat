import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useGetMessagesQuery, useAddMessageMutation, messagesApi } from '../services/messagesApi.js';
import { Context } from '../init.js';
import routes from '../utils/routes.js';
import useAuth from '../hooks/useAuth';

const MessageForm = ({ activeChannelId, channels }) => {
  const { data: messages, refetch, error: messageError } = useGetMessagesQuery();
  const [addMessage, { isLoading, error }] = useAddMessageMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { filter, socket } = useContext(Context);

  useEffect(() => {
    inputRef.current.focus();
    if (messageError) {
      toast.error(t('toast.errorNetwork'));
      auth.logOut();
      navigate(routes.login);
      throw messageError;
    }
  }, [messageError, t, navigate, auth]);

  useEffect(() => {
    function getNewMessage(newMessage) {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMessage);
      }));
    }

    socket.on('newMessage', getNewMessage);

    return () => {
      socket.off('newMessage', getNewMessage);
    };
  }, [dispatch, refetch, socket]);

  const activeMessages = messages?.filter(({ channelId }) => channelId === activeChannelId) || [];
  const { username } = useSelector((state) => state.users);

  const onSubmit = async (values, actions) => {
    try {
      const newMessage = { body: filter(values.body), channelId: activeChannelId, username };
      await addMessage(newMessage).unwrap();
      actions.resetForm({
        values: {
          body: '',
        },
      });
    } catch {
      toast.error(t('toast.errorNetwork'));
      console.error(error);
    }
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channels.find((channel) => channel.id === activeChannelId)?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('mainPage.messagesCount.key', { count: activeMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages?.filter(({ channelId }) => channelId === activeChannelId).map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            onSubmit={onSubmit}
            initialValues={{ body: '' }}
          >
            {({
              handleSubmit, handleChange, values,
            }) => (
              <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder={t('mainPage.enterMessage')}
                    className="border-0 p-0 ps-2"
                    onChange={handleChange}
                    value={values.body}
                    ref={inputRef}
                  />
                  <button
                    type="submit"
                    className="btn btn-group-vertical"
                    disabled={isLoading || values.body.replaceAll(' ', '').length === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                      />
                    </svg>
                    <span className="visually-hidden">
                      {t('mainPage.send')}
                    </span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
