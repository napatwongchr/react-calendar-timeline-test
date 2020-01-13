import moment from "moment";
import avatar from "./images/avatar01.png";
import avatar2 from "./images/avatar02.png";

const groupsMock = [
  { id: 1, title: "สุจิตรา งามคงแสน", avatar },
  { id: 2, title: "โอฬาร คิจจพรรค", avatar: avatar2 },
  { id: 3, title: "ทมยันตี มเหศวร", avatar },
  { id: 4, title: "ประยุทธ์ สืบบดี", avatar: avatar2 },
  { id: 5, title: "นาตายา พงศ์ไพศ", avatar }
];

const itemsMock = [
  {
    id: 1,
    group: 1,
    title: "#1321391230129THA",
    color: "green",
    isCritical: true,
    start_time: moment(),
    end_time: moment().add(4, "hour")
  },
  {
    id: 2,
    group: 2,
    color: "blue",
    isCritical: false,
    title: "#1321391230129JPN",
    start_time: moment().add(-0.5, "hour"),
    end_time: moment().add(3.5, "hour")
  },
  {
    id: 3,
    group: 1,
    color: "purple",
    isCritical: false,
    title: "#1321391230129USA",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour")
  },
  {
    id: 4,
    group: 4,
    color: "orange",
    isCritical: false,
    title: "#1321391230129USA",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(6, "hour")
  },
  {
    id: 5,
    group: 5,
    color: "lightblue",
    isCritical: false,
    title: "#1321391230129USA",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(6, "hour")
  }
];

export { itemsMock, groupsMock };
