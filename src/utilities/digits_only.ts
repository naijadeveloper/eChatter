export const RE_DIGIT = new RegExp(/^\d+$/);

export function genDigits(count: number) {
	const num_arry = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let digits = "";

  for(let i = 0; i < count; i++) {
  	let rand = Math.floor(Math.random() * 10);
    digits += num_arry[rand];
  }
  
  return digits;
}