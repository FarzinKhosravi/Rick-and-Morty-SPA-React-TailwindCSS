function AccordionItems({ renderMobileItems }) {
  return <div className="block md:hidden">{renderMobileItems()}</div>;
}

export default AccordionItems;
