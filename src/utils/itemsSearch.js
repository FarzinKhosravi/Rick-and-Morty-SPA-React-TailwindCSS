import toast from "react-hot-toast";

export default function itemsSearch(data, page, items, formik) {
  const itemsData = data[page][items].filter((item) =>
    item.name.toLowerCase().includes(formik.values.userSearch.toLowerCase())
  );

  if (itemsData.length === 0) {
    toast.error("Your Character Not Found 🧐");
  }

  return itemsData;
}
