"use client";
import { SERVICE } from "@/constant/service";
import DatePicker from "@/global/date-picker/DatePicker";
import TextDropdown from "@/global/text-dropdown/TextDropdown";
import { useEmployeeStore } from "@/zustand/employeeStore";
import { useModalStore } from "@/zustand/store";
import { CaretDown } from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useOutsideClick from "../../../hooks/useOutsideClick";
import Adresse from "../adresse/Adresse";
import styles from "./HomeComponent.module.scss";

const HomeComponent = () => {
  const { setHandleStatusModal } = useModalStore();
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const methods = useForm();
  const { handleSubmit, setValue, register, reset } = methods;
  const [birthDate, setBirthDate] = useState<any>(dayjs());
  const [jobStartDate, setJobStartDate] = useState<any>(dayjs());
  const [serviceDropdown, setServiceDropdown] = useState(false);

  const openModal = () => {
    setHandleStatusModal({
      status: true,
      children: <div>Félicitation, cette personne a bien été créé</div>,
      title: "Check",
    });
  };

  useEffect(() => {
    setValue("service", "Ventes");
  }, []);

  const isAtLeast16YearsOld = (birthDate: string) => {
    const today = dayjs();
    const birth = dayjs(birthDate);
    const age = today.diff(birth, "year", true);
    return age >= 16;
  };

  const handleDataBirth = (data: any) => {
    if (!isAtLeast16YearsOld(data)) {
      setHandleStatusModal({
        status: true,
        children: <div>L'utilisateur doit avoir au moins 16 ans</div>,
        title: "Erreur",
      });
      return;
    }
    setBirthDate(dayjs(data).format());
  };

  const handleDataJobStart = (data: any) => {
    setJobStartDate(dayjs(data).format());
  };

  const handleSelectedItem = (item: any) => {
    setValue("service", item.name);
    setServiceDropdown(false);
  };

  const handleOpenService = () => {
    setServiceDropdown(false);
  };

  const serviceRef = useOutsideClick(handleOpenService);

  const submit = (data: any) => {
    const formattedBirthDate = dayjs(birthDate).format("DD-MM-YYYY");
    const birthYear = dayjs(birthDate).year();

    const completeData = {
      ...data,
      birthDate: formattedBirthDate,
      jobStartDate,
    };

    if (birthYear > 2009) {
      setHandleStatusModal({
        status: true,
        children: <div>L'utilisateur doit avoir au moins 16 ans</div>,
        title: "Erreur",
      });
    } else {
      addEmployee(completeData);
      openModal();
      reset();
    }
  };

  const renderService = useMemo(() => {
    return (
      <div ref={serviceRef} style={{ position: "relative" }}>
        <div className="m-input">
          <label>Service</label>
          <div
            className="m-input__core"
            onClick={() => setServiceDropdown(!serviceDropdown)}
            style={{ cursor: "pointer" }}
          >
            <input
              type="text"
              {...register("service")}
              readOnly
              style={{ cursor: "pointer" }}
            />
            <div className="m-input__core__suffix">
              <CaretDown weight="bold" />
            </div>
          </div>
        </div>
        {serviceDropdown && (
          <div className={styles.dropdown} ref={serviceRef}>
            <TextDropdown
              content={SERVICE}
              handleSelectedItem={handleSelectedItem}
            />
          </div>
        )}
      </div>
    );
  }, [serviceDropdown]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <Image
          src={"/images/logo.webp"}
          loading="lazy"
          alt="logo"
          width={100}
          height={100}
        />
        <h1 className={styles.title}>HRnet</h1>
      </div>
      <div className={styles.switch}>
        <div className={styles.active}>Création d'employé</div>
        <Link href={"/employees"} className={styles.inactive}>
          Voir les employés
        </Link>
      </div>
      <h2 className={styles.subtitle}>Ajouter un nouvel employé</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.names}>
            <div className="m-input">
              <label>
                Prénom <span>*</span>
              </label>
              <div className="m-input__core">
                <input
                  type="text"
                  {...register("firstname", { required: true, minLength: 2 })}
                  placeholder="john"
                />
              </div>
            </div>
            <div className="m-input">
              <label>
                Nom <span>*</span>
              </label>
              <div className="m-input__core">
                <input
                  type="text"
                  {...register("lastname", { required: true, minLength: 2 })}
                  placeholder="doe"
                />
              </div>
            </div>
          </div>
          <div className={styles.dates}>
            <DatePicker
              label={`Date de naissance`}
              isRequired={true}
              handleData={handleDataBirth}
              singlePicker={true}
              initialStartDate={birthDate}
            />
            <DatePicker
              label={`Date de début de prise de poste`}
              isRequired={true}
              handleData={handleDataJobStart}
              singlePicker={true}
              initialStartDate={jobStartDate}
            />
          </div>

          <Adresse />
          {renderService}
          <button type="submit" className="m-button m-button--primary">
            <span>Créer le nouvel employé</span>
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default HomeComponent;
