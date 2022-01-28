import React, { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import CategoriesNew from "./CategoriesNew";
import { useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  getAllCategories,
  updateCategory,
} from "../../Services/Organizations/CategoriesService";
import formatDate from "../../Helpers/formatDate";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./CategoriesIndex.css";

export default function CategoriesIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");
  const [showingCategoryNew, setShowingCategoryNew] = useState(false);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const currentOrganizationId = currentOrganization.id;
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const fetchCategories = useCallback(async () => {
    if (!organizationClient) {
      return;
    }

    try {
      const categories = await getAllCategories(organizationClient);
      setCategories(categories);
    } catch (error) {
      setErrors([error]);
    } finally {
      setLoading(false);
    }
  }, [organizationClient]);

  console.log("categories", categories);

  const handleDropdownMiniAction = async ({ option, category }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_ARCHIVED":
          await updateCategory(organizationClient, category.id, {
            archived: false,
          });
          break;
        case "MARK_AS_ARCHIVED":
          await updateCategory(organizationClient, category.id, {
            archived: true,
          });
          break;
        case "EDIT":
          console.log("banana");
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
      await fetchCategories();
    } catch (error) {
      console.error(error);
      setErrors([error]);
    }
  };

  const handleCloseCategoriesNew = () => {
    setShowingCategoryNew(false);
    return fetchCategories();
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    {
      Header: "Date Created",
      accessor: (category) => formatDate(category.created_at),
    },
    {
      Header: "Last Modified",
      accessor: (category) => (
        <div className="categories-index__last-modified-cell">
          {formatDate(category.updated_at)}
          <DropdownMini
            className="categories-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              category.archived
                ? {
                    value: "REMOVE_FROM_ARCHIVED",
                    label: "Remove from Archived",
                  }
                : { value: "MARK_AS_ARCHIVED", label: "Archive" },
              { value: "EDIT", label: "Edit" },
            ]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, category })
            }
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) => {
        const matchesTitle = category.name
          .toLowerCase()
          .includes(searchFilters.title.toLowerCase());
        return matchesTitle;
      })
      .filter((category) => {
        if (tabSelect === "All") {
          return category;
        } else if (tabSelect === "Archived") {
          return category.archived === true;
        }
        return category;
      });
  }, [categories, searchFilters, tabSelect]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <section className="categories-index">
      <h1 className="categories-index__header-text">All Categories</h1>
      <div className="categories-index__actions">
        <TextBox
          labelText="Search Categories by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="categories-index__search-input"
        />
        <Button onClick={() => setShowingCategoryNew(true)}>
          Add New Category
        </Button>
      </div>
      <div className="categories-index__table-tabs">
        <Button
          onClick={() => setTabSelect("All")}
          className={clsx(
            "categories-index__table-tab-button",
            tabSelect === "All" &&
              "categories-index__table-tab-button--selected"
          )}
          variant="text"
        >
          All
        </Button>
        <Button
          onClick={() => setTabSelect("Archived")}
          className={clsx(
            "categories-index__table-tab-button",
            tabSelect === "Archived" &&
              "categories-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Archived
        </Button>
      </div>
      <div className="categories-index__table">
        {filteredCategories.length ? (
          <Table columns={columns} data={filteredCategories} />
        ) : (
          <p>There are no categories for this category.</p>
        )}
      </div>
      <CategoriesNew
        show={showingCategoryNew}
        onClose={() => handleCloseCategoriesNew()}
      />
    </section>
  );
}

//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useMemo,
// } from "react";
// import Button from "../design/Button/Button";
// import TextBox from "../design/TextBox/TextBox";
// import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
// import { Link, useParams } from "react-router-dom";
// import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
// import { getAllCategories } from "../../Services/Organizations/CategoriesService";
// import formatDate from "../../Helpers/formatDate";
// import countWords from "../../Helpers/countWords";
// import "./CategoriesIndex.css";

// export default function CategoriesIndex(props) {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState([]);
//   const [editButton, setEditButton] = useState(true);
//   const [deleteButton, setDeleteButton] = useState(true);
//   const { currentOrganization, organizationClient } =
//     useCurrentOrganization();
//   const currentOrganizationId =
//     currentOrganization.id;

//   const [searchFilters, setSearchFilters] = useState({
//     name: "",
//   });

//   const columns = [{ Header: "Category Name", accessor: "name" }];

//   useEffect(() => {
//     if (organizationClient)
//       getAllCategories(organizationClient)
//         .then((categories) => {
//           setCategories(categories);
//           console.log(categories);
//           setLoading(false);
//         })
//         .catch((error) => console.log(error));
//   }, [organizationClient]);

//   const filteredCategories = useMemo(() => {
//     return categories.filter((category) => {
//       const matchesName = category.name
//         .toLowerCase()
//         .includes(searchFilters.name.toLowerCase());
//       return matchesName;
//     });
//   }, [categories, searchFilters]);

//   if (errors.length) {
//     console.error(errors);
//     return <p>Error! {errors.map((error) => error.message)}</p>;
//   } else if (loading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="CategoriesIndex">
//       <section className="CategoriesIndex__Overview">
//         <header className="CategoriesIndex__Header">
//           <h1 className="CategoriesIndex__HeaderText">All Categories</h1>
//         </header>
//       </section>
//       <section className="CategoriesIndex__Actions">
//         {/* <div className="CategoriesIndex__SearchBar"> */}
//         <TextBox
//           search
//           onChange={(event) =>
//             setSearchFilters({ ...searchFilters, text: event.target.value })
//           }
//           className="CategoriesIndex__SearchInput"
//         />
//         <Button>
//           <Link to={`/organizations/${currentOrganizationId}/categories-new/`}>
//             Add New Category
//           </Link>
//         </Button>
//         {/* </div> */}
//       </section>
//       <section className="CategoriesIndex__TableSection">
//         <div className="CategoriesIndex__Table">
//           <AccordionTable
//             columns={columns}
//             data={filteredCategories}
//             dropDownProps={false}
//             editButton={editButton}
//             deleteButton={deleteButton}
//           />
//         </div>
//       </section>
//     </div>
//   );
// }
