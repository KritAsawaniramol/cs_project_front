import style from "./About.module.css";
import PropTypes from 'prop-types';

export default function About({data}) {
  console.log(data);


  return (
    <>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.item}>
            <span>Address:</span>
            {data?.address.country &&
            data?.address.district &&
            data?.address.house_number &&
            data?.address.subdistrict &&
            data?.address.village &&
            data?.address.postal_code !== ""
              ? data?.address.country +
                " " +
                data?.address.district +
                " " +
                data?.address.house_number +
                " " +
                data?.address.subdistrict +
                " " +
                data?.address.village +
                " " +
                data?.address.postal_code
              : "-"}
          </div>

          <div className={style.item}>
            <span>Phone:</span>
            {data?.phone !== "" ? data?.phone : "-"}
          </div>
        </div>
      </div>
    </>
  );
}


About.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      country: PropTypes.string,
      district: PropTypes.string,
      house_number: PropTypes.string,
      subdistrict: PropTypes.string,
      village: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    phone: PropTypes.string,
  }),
};