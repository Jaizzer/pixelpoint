export default function getPrice(digit) {
	const lengthOfDigit = digit.toString().length;
	return Math.ceil((digit / Math.pow(10, lengthOfDigit)) * 10000) / 100;
}
