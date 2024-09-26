import cn from 'classnames';

const setClasses = (cur, activeId) => {
  const channelClasses = cn('w-100', 'rounded-0', 'text-start', {
    'text-truncate': cur.removable,
    btn: true,
    'btn-secondary': cur.id === activeId,
  });
  return channelClasses;
};

const renderChannel = (channel, handler, activeId) => (
  <button
    type="button"
    onClick={handler}
    className={setClasses(channel, activeId)}
  >
    <span className="me-1">#</span>
    {channel.name}
  </button>
);

export default renderChannel;
