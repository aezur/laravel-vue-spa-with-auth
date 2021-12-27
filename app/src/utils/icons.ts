import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCity,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTimes,
  faBars,
  faCity,
);

export default FontAwesomeIcon;