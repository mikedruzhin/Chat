import Add from './NewChannelCreation.jsx';
import Remove from './ChannelRemoving.jsx';
import Rename from './ChannelRenaming.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
