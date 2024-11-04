import { useEffect, useState } from "react";
import style from "./Overview.module.css";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

export default function Overview(props) {
  const { data } = props;
  const id = localStorage.getItem("roleID");
  const [owner, setOwner] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/view/normalUsers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setOwner(data.normalUser.normal_user_info);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
    <CssBaseline />
      <div className={style.main}>
        <div className={style.newsItem}>
          {" "}
          <h2 className={style.newsItemTitle}>Description</h2>
          <p className={style.newsItemDescription}>
            {data?.description !== "" ? data?.description : "-"}
          </p>
        
        </div>

        <div className={style.newsItem}>
          <h3 className={style.newsItemTitle}>Owner info</h3>
          <p className={style.newsItemDescription}>
            {owner?.first_name_eng && owner?.last_name_eng !== ""
              ? "Name: " + owner?.first_name_eng + " " + owner.last_name_eng
              : "Name: -"}
          </p>
          <p className={style.newsItemDescription}>
            {owner?.phone !== "" ? "Phone: " + owner?.phone : "Phone: -"}
          </p>
        </div>
      </div>
    </>
  );
}

Overview.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    normalUser: PropTypes.shape({
      normal_user_info: PropTypes.shape({
        first_name_eng: PropTypes.string,
        last_name_eng: PropTypes.string,
        phone: PropTypes.string,
      }),
    }),
  }).isRequired,
};