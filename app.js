const keyboardMapping = [
  { english: "Q", persian: "ض" },
  { english: "W", persian: "ص" },
  { english: "E", persian: "ث" },
  { english: "R", persian: "ق" },
  { english: "T", persian: "ف" },
  { english: "Y", persian: "غ" },
  { english: "U", persian: "ع" },
  { english: "I", persian: "ه" },
  { english: "O", persian: "خ" },
  { english: "P", persian: "ح" },
  { english: "[", persian: "ج" },
  { english: "]", persian: "چ" },
  { english: "\\", persian: "پ" },
  { english: "A", persian: "ش" },
  { english: "S", persian: "س" },
  { english: "D", persian: "ی" },
  { english: "F", persian: "ب" },
  { english: "G", persian: "ل" },
  { english: "H", persian: "ا" },
  { english: "J", persian: "ت" },
  { english: "K", persian: "ن" },
  { english: "L", persian: "م" },
  { english: ";", persian: "ک" },
  { english: "'", persian: "گ" },
  { english: "Z", persian: "ظ" },
  { english: "X", persian: "ط" },
  { english: "C", persian: "ز" },
  { english: "V", persian: "ر" },
  { english: "B", persian: "ذ" },
  { english: "N", persian: "د" },
  { english: "M", persian: "ئ" },
  { english: ",", persian: "و" },
  { english: ".", persian: "." },
  { english: "/", persian: "/" },
];

const all_word_change = Array.from(document.querySelectorAll(".word_main"));
const kadr_mesage = document.querySelector(".kadr_mesage");
const messageElement = document.querySelector(".mesage");
const line = document.querySelector(".line");
const text = document.querySelector(".text");

let all_btn;
let find_Iteam;
let iskadr = false;
let position_curser;
let isCapsLock = false;
let status_language = "persian";

// change_language
const change_language = function () {
  status_language = status_language === "persian" ? "english" : "persian";
  for (let i in keyboardMapping) {
    all_word_change[i].textContent = "";
    all_word_change[i].textContent += keyboardMapping[i][status_language];
    all_word_change[i].setAttribute(
      "data-name",
      all_word_change[i].textContent
    );
  }
  all_btn = Array.from(document.querySelectorAll("span"));
};

const animation_kadr_mesage = function (message) {
  if (iskadr) return;
  iskadr = true;
  messageElement.innerHTML = `${message} successful <span style='font-size:30px;'>&#128221;</span>`;
  kadr_mesage.style.top = "5rem";
  line.classList.add("animatin_line");
  setTimeout(() => {
    kadr_mesage.style.top = "-6rem";
    setTimeout(() => {
      line.classList.remove("animatin_line");
      iskadr = false;
    }, 600);
  }, 3000);
};

const wirteFanc = function (word) {
  if (position_curser === text.value.length) text.value += word.key;
  else {
    text.value =
      text.value.slice(0, position_curser) +
      word.key +
      text.value.slice(position_curser);
    position_curser++;
    text.setSelectionRange(position_curser, position_curser);
  }
};

const removeFanc = function () {
  let start = text.selectionStart;
  let end = text.selectionEnd;
  if (start !== end) {
    let matn = text.value;
    text.value = matn.substring(0, start) + matn.substring(end);
  } else {
    if (position_curser === 0) return;
    else if (position_curser === text.value.length)
      text.value = text.value.slice(0, -1);
    else {
      text.value =
        text.value.slice(0, position_curser - 1) +
        text.value.slice(position_curser);
      position_curser--;
      text.setSelectionRange(position_curser, position_curser);
    }
  }
};

// event press hear
const work_btn = function (word) {
  word.preventDefault();
  if (word.altKey && word.shiftKey) change_language();
  else if (word.code === "Backspace") removeFanc(word);
  else if (word.ctrlKey && word.code === "KeyC") {
    navigator.clipboard
      .writeText(text.value)
      .then(() => animation_kadr_mesage("copy"))
      .catch((err) => console.error(err));
  } else if (word.ctrlKey && word.code === "KeyV") {
    navigator.clipboard
      .readText()
      .then((textRed) => {
        text.value += textRed;
        animation_kadr_mesage("past");
      })
      .catch((err) => console.error(err));
  } else if (word.ctrlKey && word.code === "KeyA") {
    text.select();
  } else if (word.key === "Tab") {
    text.value += "    ";
  } else if (word.key === "Enter") {
    text.value += "\n";
    text.scrollTop = text.scrollHeight;
  } else if (!word.altKey && !word.ctrlKey && word.key.length === 1)
    wirteFanc(word);
};

// selectBtn( )
const selectBtn = function (e) {
  let word;
  switch (e.key) {
    case "Shift":
      word = e.code;
      break;
    case "Control":
      word = e.code;
      break;
    case "Alt":
      word = e.code;
      break;
    case "÷":
      word = "`";
      break;
    case "×":
      word = "~";
      break;
    case "؟":
      word = "?";
      break;
    case "»":
      word = "م";
      break;
    case "ء":
      word = "ئ";
      break;
    case "آ":
      word = "ا";
      break;
    default:
      word = e.key;
  }
  return word;
};

const colrFanc = function (e, vaz) {
  // e.preventDefault();
  find_Iteam = all_btn.findIndex(
    (item) =>
      item.getAttribute("data-name").toLowerCase() ===
      selectBtn(e).toLowerCase()
  );
  if (all_btn[find_Iteam]) {
    if (vaz === "add") {
      all_btn[find_Iteam].parentElement.classList.add("bg2");
      return true;
    } else {
      if (e.code === "CapsLock") {
        if (!isCapsLock) {
          isCapsLock = !isCapsLock;
          return;
        }
        isCapsLock = !isCapsLock;
      }
      all_btn[find_Iteam].parentElement.classList.remove("bg2");
    }
    return false;
  }
};

const tagsem = function (e, vaz) {
  text.focus();
  const start = text.selectionStart;
  const end = text.selectionEnd;
  position_curser = start;
  if (e.key === "ArrowRight") {
    if (start < text.value.length) text.setSelectionRange(start + 1, end + 1);
    e.preventDefault();
  } else if (e.key === "ArrowLeft") {
    if (start > 0) text.setSelectionRange(start - 1, end - 1);
    e.preventDefault();
  }
  colrFanc(e, vaz) && work_btn(e);
};

const initFanc = function () {
  text.focus();
  change_language();
};
initFanc();

document.body.addEventListener("keydown", (e) => tagsem(e, "add"));
document.body.addEventListener("keyup", (e) => colrFanc(e, "remove"));
text.addEventListener("click", () => (position_curser = text.selectionStart));
