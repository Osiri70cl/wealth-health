import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import styles from "../adresse/Adresse.module.scss";
import TextDropdown from "@/global/text-dropdown/TextDropdown";
import { REGIONS } from "@/constant/regions";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { CaretDown } from "@phosphor-icons/react";

type Props = {
  handleAddresseData: (data: AddressData) => void;
};

type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

const Adresse = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<AddressData>();
  const [stateDropdown, setStateDropdown] = useState(false);

  const handleStateDropdown = () => {
    setStateDropdown(false);
  };

  useEffect(() => {
    setValue("state", REGIONS[0].name);
  }, []);

  const stateRef = useOutsideClick(handleStateDropdown);

  const handleSelectedItem = (item: string) => {
    setValue("state", item.name);
    setStateDropdown(false);
  };

  const renderRegions = useMemo(() => {
    return (
      <div style={{ position: "relative" }}>
        <div className="m-input">
          <label>
            Région <span>*</span>
          </label>
          <div
            className="m-input__core"
            style={{ cursor: "pointer" }}
            onClick={() => setStateDropdown(!stateDropdown)}
          >
            <input
              type="text"
              {...register("state", { required: true })}
              placeholder="Nouvelle-Aquitaine"
              style={{ cursor: "pointer" }}
            />
            <div className="m-input__core__suffix">
              <CaretDown weight="bold" />
            </div>
          </div>
        </div>
        {stateDropdown && (
          <div className={styles.dropdown} ref={stateRef}>
            <TextDropdown
              content={REGIONS}
              handleSelectedItem={handleSelectedItem}
            />
          </div>
        )}
      </div>
    );
  }, [stateDropdown]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.adress}>
        <div className="m-input">
          <label>
            Rue <span>*</span>
          </label>
          <div className="m-input__core">
            <input
              type="text"
              {...register("street", { required: true })}
              placeholder="LANDEGRAND"
            />
          </div>
        </div>
        <div className="m-input">
          <label>
            Ville <span>*</span>
          </label>
          <div className="m-input__core">
            <input
              type="text"
              {...register("city", { required: true, minLength: 3 })}
              placeholder="Parempuyre"
            />
          </div>
        </div>
      </div>
      {renderRegions}
      <div className="m-input">
        <label>
          Code postal <span>*</span>
        </label>
        <div className="m-input__core">
          <input
            type="text"
            {...register("zip", { required: true, minLength: 5 })}
            placeholder="33290"
          />
        </div>
      </div>
    </div>
  );
};

export default Adresse;
