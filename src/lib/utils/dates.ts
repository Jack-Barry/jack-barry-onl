import dayjs from 'dayjs';

const DATE_FORMAT = "dddd, MMMM D, YYYY @ h:mm A"
const DATE_FORMAT_CONDENSED = "ddd, MMM D, YYYY"

export function formattedDate(date: string, options: { condensed?: boolean } = {}) {
	const { condensed } = options

	return dayjs(date).format(condensed ? DATE_FORMAT_CONDENSED : DATE_FORMAT);
}
