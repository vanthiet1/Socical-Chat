import { format } from 'date-fns';

const FormatDateAndTime = (timestamp) => {
    return format(new Date(timestamp), ' HH:mm');
  };
  export default FormatDateAndTime