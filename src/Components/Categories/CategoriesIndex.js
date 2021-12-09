import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
import { Link, useParams } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";
import formatDate from "../../Helpers/formatDate";
import countWords from "../../Helpers/countWords";
import "./CategoriesIndex.css";

export default function CategoriesIndex(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [editButton, setEditButton] = useState(true);
  const [deleteButton, setDeleteButton] = useState(true);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });

  const columns = [{ Header: "Category Name", accessor: "name" }];

  useEffect(() => {
    if (organizationClient)
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
          console.log(categories);
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [organizationClient]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [categories, searchFilters]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="CategoriesIndex">
      <section className="CategoriesIndex__Overview">
        <header className="CategoriesIndex__Header">
          <h1 className="CategoriesIndex__HeaderText">All Categories</h1>
        </header>
      </section>
      <section className="CategoriesIndex__Actions">
        {/* <div className="CategoriesIndex__SearchBar"> */}
        <TextBox
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, text: event.target.value })
          }
          className="CategoriesIndex__SearchInput"
        />
        <Button>
          <Link to={`/organizations/${currentOrganizationId}/categories-new/`}>
            Add New Category
          </Link>
        </Button>
        {/* </div> */}
      </section>
      <section className="CategoriesIndex__TableSection">
        <div className="CategoriesIndex__Table">
          <AccordionTable
            columns={columns}
            data={filteredCategories}
            dropDownProps={false}
            editButton={editButton}
            deleteButton={deleteButton}
          />
        </div>
      </section>
    </div>
  );
}
