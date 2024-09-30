import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../services/channelsApi';

const Remove = ({ onHide, modalInfo }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();
  const currId = modalInfo.item.id;

  const onSubmit = async () => {
    try {
      await removeChannel(currId).unwrap();
      onHide();
      toast.success(t('modal.deleteChannel.success'));
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.deleteChannel.deleteChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modal.deleteChannel.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t('modal.createChannel.cancel')}</Button>
          <Button
            type="button"
            variant="danger"
            onClick={onSubmit}
          >
            {t('modal.deleteChannel.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
