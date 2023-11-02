import dayjs from 'dayjs';

export function formattedDate(date: string, options: { condensed?: boolean } = {}) {
	if (options.condensed) {
		return dayjs(date).format('ddd, MMM D, YYYY');
	}

	return dayjs(date).format('dddd, MMMM D, YYYY @ h:mm A');
}
