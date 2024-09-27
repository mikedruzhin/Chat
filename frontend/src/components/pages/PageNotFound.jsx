import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundSvg from '../../public/img/notFound.svg';
import routes from '../../utils/routes';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        src={notFoundSvg}
        alt={t('notFoundPage.notFound')}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.youCanMove')}
        {'\u00A0'}
        <Link to={routes.chat}>{t('notFoundPage.mainPage')}</Link>
      </p>
    </div>
  );
};
export default PageNotFound;
