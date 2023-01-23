import React from "react";
import { SearchForm } from "./SearchForm";
import { SearchList } from "./SearchList";
import { Title } from "../../components/Title";

export const Search = () => {
  return (
    <section className="page-section">
      <Title text="Search Page" />
      <SearchForm />
      <SearchList />
    </section>
  );
};
