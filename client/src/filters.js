import moment from 'moment';

export const dateFromNow = (input) => moment(input).fromNow();
export const date = (input) => moment(input).format('MMM D, YYYY');
