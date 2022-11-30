import { v4 } from "uuid";

const item = {
  id: v4(),
  name: "Develop Home Page"
};
const item1 = {
  id: v4(),
  name: "Develop Login Page"
};
const item2 = {
  id: v4(),
  name: "Develop Register Page"
};
const item3 = {
  id: v4(),
  name: "Develop Welcome Page"
};

const Data = {
  todo: {
    title: "Todo",
    items: [item, item1]
  },
  "in-progress": {
    title: "Processing",
    items: [item2]
  },
  completed: {
    title: "Done",
    items: [item3]
  }
};

export default Data;