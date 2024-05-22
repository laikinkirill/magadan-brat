/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Header } from "../../components";
import { Button, Accordion } from "../../UI";
import classNames from "classnames";
import {
  MAP_POINTS,
  SEA_POINTS,
  useTouristDestinationsPageStore,
} from "../../store/touristDestinationsPage";
import { updateTextAndReturnArr, updateTextAndSetInnerHTML } from "../../utils";

import c from "./tours.module.scss";

import routesMap from "../../assets/img/tours/routes_map.svg";
import seaMap from "../../assets/img/tours/sea_map.svg";

function Tours() {
  return (
    <>
      <Header className={c.header} />

      <div className={c.page_body}>
        <FirstBlock />

        <VideoBlock />

        <PeninsulaRoutesBlock />

        <RoutesOutsideTheCityBlock />

        <SeaRoutesBlock />

        <IndividualTourBlock />

        <JackLondonLakeBlock />
      </div>
    </>
  );
}

const MapPoint = ({
  id,
  children,
  textOrientation,
  position,
  data,
  popupPosition,
  onClick,
  onClose,
}) => {
  const [activePoint, setActivePoint] = useState(false);

  const onClickHandler = () => {
    setActivePoint((prev) => !prev);
    onClick?.();
  };

  const closePopup = (e) => {
    if (e.currentTarget === e.target) {
      setActivePoint(false);
      onClose?.();
    }
  };

  return (
    <>
      <div
        className={classNames(
          c.map_point,
          c[textOrientation],
          activePoint ? c._active : ""
        )}
        style={{ ...position }}
        onClick={onClickHandler}
      >
        <span className={id % 2 === 0 ? c._left : ""}>{data?.val?.text}</span>
        {children}
      </div>

      <div
        className={classNames(
          c.map_popup,
          activePoint ? c._active : "",
          c[popupPosition]
        )}
        onClick={closePopup}
      >
        <div className={c.popup_body}>
          <div className={c.img_wrapper}>
            {data?.img?.val && <img src={data.img.val} alt="" />}
            <p className={c.title}>{data?.val?.text}</p>
          </div>

          <div className={c.info}>
            {data?.val?.map && (
              <div className={c.info_map}>
                <>
                  <iframe
                    frameBorder="0"
                    scrolling="no"
                    src={data?.val?.map}
                    width="310"
                    height="400"
                  ></iframe>
                  <div
                    style={{
                      color: "#777",
                      fontSize: "11px",
                      lineHeight: "16px",
                    }}
                  >
                    Powered by&nbsp;
                    <a
                      style={{
                        color: "#4C8C2B",
                        fontSize: "11px",
                        lineHeight: "16px",
                      }}
                      target="_blank"
                      href="https://ru.wikiloc.com"
                      rel="noreferrer"
                    >
                      Wikiloc
                    </a>
                  </div>
                </>
              </div>
            )}

            <div className={c.elements}>
              <div>
                <p>Время похода</p>
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1801 0.24746C9.43483 0.505273 8.92858 1.09121 8.79733 1.85996C8.64733 2.72715 9.11608 3.62715 9.92233 4.0209C10.213 4.16621 10.2505 4.1709 10.7895 4.1709C11.3051 4.1709 11.3755 4.16152 11.6286 4.03965C12.1864 3.78184 12.5614 3.35527 12.7348 2.79277C13.0676 1.72871 12.477 0.580273 11.4317 0.256835C11.052 0.139648 10.5036 0.13496 10.1801 0.24746Z"
                      fill="white"
                    />
                    <path
                      d="M16.925 2.94746C16.8407 3.01308 16.836 3.09746 16.8219 4.76621L16.8079 6.51465L16.0391 6.82871C15.6172 7.00683 15.2282 7.14746 15.1813 7.14746C15.1344 7.14746 13.8829 6.57559 12.4016 5.87246C9.49536 4.49434 9.47192 4.48496 8.9938 4.6209C8.67505 4.70996 8.36567 5.04277 8.03755 5.64746C7.22661 7.15215 6.82817 8.79746 6.82817 10.6584C6.82817 11.4834 6.8938 12.0646 7.01567 12.3084C7.1188 12.51 7.23599 12.6131 9.12505 14.235C9.88442 14.8865 10.536 15.4818 10.5688 15.5521C10.6204 15.66 10.6204 15.9834 10.5547 17.5209C10.4516 20.0943 10.4516 20.3053 10.5454 20.5162L10.6204 20.6943H8.25317C6.01724 20.6943 5.89067 20.6896 5.92817 20.61C5.95161 20.5678 6.67349 19.2178 7.5313 17.61C8.38911 16.0021 9.07349 14.6709 9.05005 14.6521C8.75005 14.3803 7.0063 12.9084 6.99692 12.9225C6.99224 12.9271 6.32661 14.5021 5.52036 16.4193C4.67192 18.4256 4.03911 19.9865 4.02974 20.099C4.01567 20.2115 4.03911 20.385 4.07661 20.4975L4.14692 20.6943H2.39849C0.870361 20.6943 0.635986 20.7037 0.575048 20.7693C0.485986 20.8537 0.476611 21.0271 0.556298 21.1068C0.598486 21.149 2.98442 21.1631 11.0094 21.1631C21.2375 21.1631 21.4016 21.1631 21.4532 21.074C21.5188 20.9475 21.5141 20.8537 21.425 20.7693C21.3594 20.7037 21.1063 20.6943 19.3391 20.6943H17.3282V14.4693V8.23965L17.9 7.89277C18.561 7.48965 18.6875 7.33965 18.6875 6.93184C18.6875 6.3459 18.0782 5.98965 17.4969 6.2334L17.3282 6.30371V4.67246C17.3282 3.14902 17.3235 3.03184 17.2438 2.96152C17.136 2.86308 17.0469 2.86308 16.925 2.94746ZM13.1047 8.83496C14.2954 9.23809 14.9657 9.44434 15.0969 9.44434C15.2657 9.44434 15.4063 9.37871 15.9735 9.04121C16.3438 8.8209 16.686 8.61934 16.7329 8.5959C16.8079 8.55371 16.8125 8.85371 16.8125 14.624V20.6943H14.6047C12.8422 20.6943 12.4063 20.6803 12.4438 20.6334C12.4672 20.6053 12.5141 20.4928 12.5422 20.3896C12.6266 20.0896 13.025 15.1959 13.0063 14.7178C12.9782 14.0662 12.8844 13.9162 11.586 12.3646L10.475 11.0381L10.7422 9.73965C10.8875 9.02246 11.0235 8.38965 11.0469 8.32871C11.075 8.26309 11.1313 8.22558 11.2016 8.22558C11.2625 8.22558 12.1204 8.49746 13.1047 8.83496Z"
                      fill="white"
                    />
                    <path
                      d="M5.79647 3.35527C5.36053 3.43965 4.91991 3.71152 4.4371 4.18965C3.93085 4.6959 3.63085 5.1459 3.37772 5.76465C3.09647 6.46777 3.0121 6.88965 3.01678 7.66309C3.01678 8.26309 3.03085 8.38496 3.13397 8.70371C3.43397 9.6084 4.01991 10.1006 4.80272 10.1006C5.32772 10.1006 5.87616 9.89902 6.29335 9.56152L6.48085 9.40684L6.58866 8.76465C6.77616 7.60215 7.20741 6.35059 7.7371 5.4084L7.98553 4.96777L7.91991 4.7334C7.61522 3.68809 6.7996 3.1584 5.79647 3.35527Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.time}
                </span>
              </div>
              <div>
                <p>Протяжённость</p>
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1483 0.315186C18.2249 0.516747 17.3577 1.06519 16.7999 1.80581C16.5421 2.14331 16.2093 2.81831 16.1062 3.22144C15.9843 3.67144 15.9608 4.37925 16.0452 4.80112C16.2937 5.99175 17.3483 7.9605 18.8999 10.1308L19.453 10.9042V11.3074C19.453 12.0011 19.5937 12.2449 19.9874 12.2449C20.3858 12.2449 20.5312 12.0058 20.5312 11.3542V10.9277L21.0749 10.1636C22.4108 8.298 23.3905 6.57769 23.7983 5.36362C24.2577 3.99956 23.9249 2.55112 22.9077 1.47768C22.3452 0.88706 21.614 0.47456 20.8499 0.319873C20.414 0.23081 19.5468 0.226123 19.1483 0.315186ZM20.414 3.38081C21.0843 3.6855 21.1405 4.63706 20.5171 5.05425C20.1562 5.29331 19.6921 5.25112 19.3546 4.94644C18.839 4.48237 18.9749 3.66206 19.6171 3.36206C19.814 3.26831 20.1937 3.27769 20.414 3.38081Z"
                      fill="white"
                    />
                    <path
                      d="M5.29714 8.26509C3.95652 8.40571 2.66277 9.02446 1.72527 9.98071C1.31277 10.3979 1.12996 10.6323 0.844019 11.0963C0.464332 11.7151 0.164332 12.5542 0.0518317 13.3088C-0.0231683 13.787 -0.0137933 14.7713 0.0705817 15.2776C0.459644 17.6635 2.38621 20.8229 5.23152 23.7198L5.75652 24.2542L6.49246 24.2354L7.22839 24.2213L7.36433 24.0667C7.55652 23.8557 7.55652 23.5463 7.36902 23.3588L7.23777 23.2276L7.51902 22.9276C8.21277 22.1776 9.25808 20.8557 9.83464 19.9932C10.9878 18.2776 11.705 16.651 11.93 15.2682C12.0143 14.7479 12.0237 13.7917 11.9487 13.3088C11.6675 11.4292 10.5331 9.82603 8.85496 8.92134C8.21277 8.57446 7.41589 8.34009 6.61433 8.2604C6.07058 8.20884 5.86902 8.20884 5.29714 8.26509ZM6.79714 11.3823C7.78621 11.6729 8.63464 12.5448 8.88308 13.5338C8.96746 13.862 8.97683 14.5276 8.90183 14.8792C8.77527 15.4838 8.31589 16.2057 7.81433 16.5854C6.26277 17.762 4.12058 17.2229 3.30496 15.4557C3.22058 15.2729 3.12683 15.0151 3.09871 14.8792C3.02371 14.5276 3.03308 13.862 3.11746 13.5338C3.39402 12.437 4.38777 11.5088 5.48933 11.312C5.82214 11.251 6.47371 11.2838 6.79714 11.3823Z"
                      fill="white"
                    />
                    <path
                      d="M19.2889 13.3652C19.2373 13.3886 19.1248 13.4964 19.0358 13.6042C18.8295 13.862 18.4076 14.0589 17.8733 14.148C17.3904 14.2323 17.2498 14.3167 17.1654 14.5792C17.1092 14.748 17.1139 14.7902 17.1842 14.9448C17.3342 15.2589 17.6483 15.3058 18.4217 15.1183C19.0733 14.9636 19.6592 14.5933 19.9264 14.1761C20.0436 13.998 20.0623 13.923 20.0436 13.7683C20.0014 13.4214 19.6311 13.2245 19.2889 13.3652Z"
                      fill="white"
                    />
                    <path
                      d="M15.0939 14.7621C14.7235 15.0105 14.4282 15.3199 14.1329 15.7792C13.6735 16.4777 13.5939 16.7636 13.786 17.0308C13.8376 17.1058 13.9548 17.1855 14.0626 17.2183C14.3626 17.3074 14.5501 17.1808 14.8079 16.7121C15.0751 16.2339 15.3939 15.8496 15.722 15.6152C15.8579 15.5167 15.9985 15.3714 16.0314 15.2964C16.172 14.9542 15.9189 14.5886 15.5485 14.5886C15.3985 14.5886 15.286 14.6308 15.0939 14.7621Z"
                      fill="white"
                    />
                    <path
                      d="M13.2429 18.2308C13.0648 18.2777 12.9429 18.4464 12.7226 18.9667C12.6054 19.2527 12.3804 19.7261 12.2304 20.0214C11.8976 20.6636 11.8788 20.8042 12.1132 21.0386C12.2351 21.1605 12.3101 21.198 12.446 21.198C12.6288 21.198 12.7882 21.1324 12.8773 21.0152C13.107 20.7292 13.8382 19.1542 13.9038 18.8074C13.9367 18.6574 13.8242 18.3855 13.6976 18.3105C13.5898 18.2402 13.3601 18.2027 13.2429 18.2308Z"
                      fill="white"
                    />
                    <path
                      d="M10.4112 22.1167C10.144 22.2855 9.67998 22.5292 9.3753 22.6605C8.97686 22.8246 8.79405 22.9277 8.7378 23.0167C8.64405 23.1527 8.63936 23.4339 8.71905 23.5886C8.77998 23.7058 9.00498 23.823 9.15967 23.823C9.49248 23.823 10.7394 23.223 11.2644 22.8152C11.4659 22.6558 11.5362 22.5667 11.5597 22.4402C11.6253 22.0792 11.4237 21.8074 11.0862 21.8074C10.9269 21.8074 10.805 21.8636 10.4112 22.1167Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.duration}
                </span>
              </div>
              <div>
                <p>Сложность</p>
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9862 0.733428C11.194 0.953741 10.5143 1.6053 10.2612 2.3928C10.1112 2.84749 10.1206 3.52718 10.2799 3.95374C10.5377 4.65687 10.9362 5.11624 11.5502 5.41624C12.544 5.89905 13.6643 5.71155 14.4424 4.93343C15.8018 3.57405 15.2112 1.28187 13.3643 0.738116C13.0549 0.649054 12.3096 0.644366 11.9862 0.733428Z"
                      fill="white"
                    />
                    <path
                      d="M19.4859 5.04122C19.0734 5.15372 18.9702 5.28028 18.1405 6.70997C17.714 7.44122 17.3155 8.07872 17.2499 8.1256C16.9921 8.3131 16.9452 8.30372 13.9874 7.5256C11.3577 6.83185 11.1515 6.78497 10.7577 6.78497C10.3687 6.78497 10.1765 6.82716 8.28273 7.33341C6.07961 7.91935 5.83586 8.00841 5.49836 8.36466C5.17961 8.69747 3.36086 11.0318 3.24367 11.2568C3.08429 11.5662 3.10773 12.0443 3.30461 12.3631C3.66086 12.935 4.50929 13.0803 5.00148 12.649C5.09523 12.5647 5.61086 11.9506 6.15461 11.2803C6.69367 10.61 7.17648 10.0287 7.23273 9.98654C7.36398 9.8881 8.84054 9.48497 9.21554 9.44747C9.74992 9.39122 10.078 9.61154 10.078 10.0287C10.078 10.1553 9.83898 11.1443 9.49211 12.4568C8.82648 14.974 8.81711 15.0443 9.05148 15.5131C9.19679 15.8131 9.44523 16.0475 9.69836 16.1365C9.77336 16.1647 11.0202 16.4881 12.464 16.8537C14.0812 17.2709 15.1312 17.5615 15.2062 17.6131C15.2671 17.6647 15.9468 18.4709 16.7109 19.4131C17.4749 20.3553 18.1687 21.1943 18.253 21.2834C18.614 21.6725 19.2234 21.7756 19.6921 21.5318C20.3109 21.2084 20.5312 20.4209 20.1702 19.8397C19.8702 19.3615 17.2452 15.9022 17.0624 15.7475C16.9593 15.6537 16.7812 15.5459 16.6734 15.5084C16.5655 15.4662 15.5999 15.199 14.5312 14.9131C13.4624 14.6272 12.539 14.36 12.478 14.3225C12.3187 14.2193 12.1874 13.9756 12.1874 13.7881C12.1874 13.5865 13.1765 10.3334 13.289 10.16C13.3968 9.99591 13.6171 9.88341 13.828 9.88341C13.9171 9.8881 14.7093 10.0803 15.5859 10.3193C17.1093 10.7318 17.1937 10.7506 17.5593 10.7318C18.0374 10.7084 18.464 10.5162 18.7405 10.2022C18.914 10.0053 20.7984 6.78497 20.9015 6.50841C20.9905 6.28341 20.9624 5.90841 20.8405 5.65528C20.6062 5.14435 20.039 4.88654 19.4859 5.04122Z"
                      fill="white"
                    />
                    <path
                      d="M7.22315 17.3741C6.68878 17.885 6.31377 18.2038 6.22002 18.2366C6.13565 18.26 5.4794 18.3163 4.75752 18.3585C4.03565 18.396 3.35127 18.4569 3.23409 18.485C2.93877 18.56 2.57315 18.935 2.48877 19.2397C2.34346 19.7553 2.54034 20.2944 2.97159 20.5616C3.27627 20.7491 3.55284 20.7585 5.60127 20.6366C7.18565 20.5475 7.44346 20.51 7.6919 20.3366C7.83721 20.2335 10.406 17.7585 10.3872 17.7397C10.3778 17.7303 10.1294 17.66 9.83878 17.5803C9.14034 17.4022 8.7794 17.2194 8.39503 16.8538L8.07628 16.5585L7.22315 17.3741Z"
                      fill="white"
                    />
                    <path
                      d="M11.9203 19.4787C11.5031 19.6146 11.1375 19.9428 10.95 20.3459C10.8563 20.5475 10.8516 20.6506 10.8375 21.9068L10.8234 23.2568H5.63438C0.628125 23.2568 0.440625 23.2615 0.309375 23.3459C0.09375 23.4912 0 23.6693 0 23.96C0 24.2506 0.09375 24.4287 0.309375 24.574C0.440625 24.6584 0.759375 24.6631 12 24.6631C23.2406 24.6631 23.5594 24.6584 23.6906 24.574C23.9062 24.4287 24 24.2506 24 23.96C24 23.6693 23.9062 23.4912 23.6906 23.3459C23.5594 23.2615 23.3766 23.2568 18.7922 23.2568H14.025L14.0063 21.9537C13.9828 20.5053 13.9641 20.4115 13.65 20.0037C13.5375 19.849 13.3734 19.7178 13.1766 19.6053C12.9141 19.4646 12.825 19.4412 12.4969 19.4271C12.2625 19.4178 12.0422 19.4365 11.9203 19.4787Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.complexity}
                </span>
              </div>
              <div>
                <p>Шагов</p>
                <span>
                  <svg
                    width="18"
                    height="25"
                    viewBox="0 0 18 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.20156 0.728711C8.72813 0.883398 8.31094 1.2584 8.07188 1.74121C7.95469 1.97559 7.94531 2.0459 7.94531 2.53809C7.94531 3.03965 7.95469 3.0959 8.08125 3.3584C8.25938 3.71934 8.61563 4.07559 8.97656 4.25371C9.23906 4.38027 9.29531 4.38965 9.79688 4.38965C10.2984 4.38965 10.3547 4.38027 10.6172 4.25371C10.9781 4.07559 11.3344 3.71934 11.5125 3.3584C11.6391 3.0959 11.6484 3.03965 11.6484 2.53809C11.6484 2.03652 11.6391 1.98027 11.5125 1.71777C11.3344 1.35684 10.9781 1.00059 10.6172 0.827148C10.3734 0.705273 10.2797 0.686523 9.86719 0.677148C9.56719 0.667773 9.32812 0.686523 9.20156 0.728711Z"
                      fill="white"
                    />
                    <path
                      d="M14.6719 0.845899C14.2266 0.991211 13.9078 1.1834 13.5891 1.50215C13.0734 2.01777 12.8438 2.58027 12.8438 3.33496C12.8438 4.04746 13.0547 4.60059 13.5188 5.10215C14.0203 5.64121 14.6438 5.9084 15.4031 5.91309C16.1766 5.91309 16.7344 5.68809 17.2547 5.16777C17.7703 4.65215 18 4.08965 18 3.33496C18 2.58027 17.7703 2.01777 17.2547 1.50215C16.9313 1.17871 16.5703 0.963086 16.1297 0.831836C15.7781 0.728711 15.0141 0.733399 14.6719 0.845899Z"
                      fill="white"
                    />
                    <path
                      d="M4.48596 1.94751C3.97034 2.16314 3.63284 2.52407 3.46877 3.04907C3.17815 3.96782 3.63752 4.91938 4.52815 5.25688C4.87971 5.38345 5.43284 5.38345 5.7844 5.25688C6.30471 5.06001 6.67502 4.67095 6.84377 4.13657C7.1344 3.21782 6.67502 2.26626 5.7844 1.92876C5.41409 1.79282 4.8469 1.8022 4.48596 1.94751Z"
                      fill="white"
                    />
                    <path
                      d="M1.06854 4.95215C0.618538 5.1209 0.215412 5.5334 0.0654125 5.97402C-0.0470875 6.31152 -0.0095875 6.94434 0.140413 7.24902C0.285725 7.54902 0.61385 7.87715 0.91385 8.02246C1.11541 8.12559 1.21385 8.13965 1.64041 8.13965C2.06698 8.13965 2.16541 8.12559 2.36698 8.02246C2.66698 7.87715 2.9951 7.54902 3.14041 7.24902C3.24354 7.04746 3.2576 6.94902 3.2576 6.52246C3.2576 6.0959 3.24354 5.99746 3.14041 5.7959C2.9951 5.4959 2.66698 5.16777 2.36698 5.02246C2.17479 4.92402 2.05291 4.90527 1.68729 4.8959C1.39197 4.88652 1.18104 4.90527 1.06854 4.95215Z"
                      fill="white"
                    />
                    <path
                      d="M9.44512 5.49114C8.36699 5.6552 7.49043 5.91771 6.62793 6.33021C4.82324 7.19739 3.8248 8.25208 3.23887 9.91146C2.81699 11.1068 2.66699 12.2318 2.66699 14.1818C2.66699 18.3208 3.1498 20.8755 4.22793 22.474C4.48105 22.8536 5.01543 23.4021 5.36699 23.6552C5.97168 24.0865 6.87637 24.4521 7.65918 24.5927C8.25918 24.6958 9.08418 24.6865 9.54355 24.5693C11.6436 24.0349 12.7123 21.9208 12.0139 19.6708C11.9529 19.4646 11.6576 18.799 11.367 18.1943C10.7951 17.013 10.6732 16.699 10.5936 16.2068C10.5045 15.6536 10.6545 15.1615 11.0764 14.6036C11.3342 14.2615 11.7279 13.9286 12.5436 13.3568C13.8561 12.4333 14.3811 11.974 14.8686 11.3318C15.4311 10.5911 15.7029 9.82239 15.7029 8.99271C15.7029 8.08333 15.4264 7.40833 14.7936 6.7802C14.3623 6.34896 13.8701 6.06771 13.1248 5.81458C12.3232 5.54739 11.892 5.48646 10.7576 5.4677C10.1904 5.45833 9.5998 5.4677 9.44512 5.49114Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.steps}
                </span>
              </div>
              <div>
                <p>
                  <span>Потраченные</span>
                  <span>калории</span>
                </p>
                <span>
                  <svg
                    width="23"
                    height="25"
                    viewBox="0 0 23 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9342 0.78496C9.52173 1.49277 6.71861 4.64746 5.66861 8.95996C5.57017 9.36309 5.35923 10.5256 5.35923 10.6615C5.35923 10.6803 5.30767 10.7178 5.24673 10.7459C5.15767 10.7881 5.07798 10.7693 4.77798 10.6287C3.70923 10.1365 2.85142 9.17559 2.47642 8.0459C2.31705 7.56777 2.21861 7.44121 1.9608 7.34277C1.59048 7.19746 1.20142 7.35683 1.04205 7.71309C0.807671 8.25215 0.399859 10.1975 0.268609 11.4068C0.165484 12.3959 0.198296 14.3412 0.334234 15.2271C0.732671 17.7818 1.73111 19.8584 3.34361 21.4803C4.96548 23.1162 7.03736 24.1334 9.60142 24.5553C10.0186 24.6209 10.3795 24.6396 11.4764 24.6396C12.967 24.635 13.4077 24.5881 14.5936 24.2881C15.7561 23.9975 17.1342 23.4162 18.0624 22.835C20.3452 21.41 21.9014 19.3287 22.5202 16.8865C22.8811 15.4709 22.8952 13.7646 22.5577 12.124C22.2061 10.4178 21.3014 8.36934 20.1155 6.60215C19.792 6.11934 19.6374 6.00684 19.2999 6.00684C18.9061 6.00684 18.7936 6.11465 18.4795 6.81777C18.2217 7.39433 17.8749 8.00371 17.6639 8.24277C17.5045 8.43027 17.378 8.36465 17.0452 7.91933C15.7702 6.2084 14.9077 3.87871 14.7577 1.71777C14.7202 1.16465 14.6311 0.925585 14.4155 0.780273C14.2655 0.677147 14.1952 0.663086 13.867 0.667772C13.6608 0.667772 13.2436 0.719336 12.9342 0.78496ZM18.1795 13.174C18.2592 13.2162 18.367 13.3428 18.428 13.46C18.5311 13.6662 18.5311 13.6662 18.5311 16.1553C18.5311 17.7115 18.5124 18.7053 18.4842 18.8131C18.4233 19.024 18.1655 19.2537 17.9358 19.2959C17.7061 19.3381 17.3733 19.1646 17.2561 18.9443C17.1764 18.7943 17.1717 18.6068 17.1717 16.1928C17.1717 14.7725 17.1905 13.5584 17.2139 13.4975C17.2749 13.3381 17.4952 13.1365 17.6592 13.0896C17.828 13.0428 17.9874 13.0662 18.1795 13.174ZM5.45298 13.2162C5.54205 13.2584 5.66392 13.3662 5.72017 13.4553C5.8233 13.6053 5.82798 13.6568 5.82798 14.5193C5.82798 15.0209 5.84205 15.4287 5.86548 15.4287C5.88423 15.4287 6.09517 15.2693 6.33423 15.0771C6.8358 14.6693 6.98111 14.6271 7.29986 14.7631C7.67017 14.9318 7.81548 15.3584 7.61392 15.6912C7.56236 15.7756 7.26705 16.0475 6.95767 16.3006C6.64361 16.5537 6.39048 16.7834 6.39048 16.8068C6.39048 16.835 6.71392 17.1818 7.11236 17.585C7.72173 18.1943 7.83892 18.3396 7.86705 18.4896C7.94205 18.8787 7.69361 19.2443 7.31392 19.3053C7.04205 19.3475 6.78892 19.1881 6.32486 18.6865C6.09986 18.4428 5.89361 18.2412 5.87017 18.2412C5.84673 18.2412 5.82798 18.3631 5.82798 18.5131C5.82798 18.8693 5.71548 19.0756 5.44361 19.2162C5.1858 19.3475 4.95611 19.324 4.74048 19.1412C4.46392 18.9068 4.46861 18.9396 4.46861 16.2162C4.46861 13.8209 4.4733 13.7178 4.56236 13.5303C4.73111 13.1834 5.11548 13.0475 5.45298 13.2162ZM11.303 14.8662C11.8092 15.1006 12.0155 15.3678 11.9545 15.7334C11.8749 16.2209 11.3874 16.4084 10.8811 16.1506C10.6749 16.0475 10.5952 16.0287 10.3233 16.0475C9.97173 16.0662 9.84517 16.1318 9.6108 16.4271C9.35298 16.7412 9.37642 17.2803 9.66236 17.5943C9.8733 17.8287 10.0608 17.9131 10.3749 17.9131C10.6467 17.9131 10.7592 17.8662 10.9702 17.6646C11.092 17.5521 11.1717 17.5193 11.3686 17.5053C11.692 17.4818 11.8936 17.599 12.0202 17.8896C12.142 18.1709 12.1045 18.3678 11.8702 18.635C11.4952 19.0615 10.9936 19.2725 10.3702 19.2725C9.10455 19.2725 8.07798 18.2459 8.07798 16.9756C8.07798 15.9865 8.70142 15.1193 9.66236 14.7865C9.93423 14.6928 10.0467 14.6787 10.4686 14.6928C10.9092 14.7068 10.9983 14.7256 11.303 14.8662ZM16.3186 15.0959C16.3702 15.124 16.4639 15.2178 16.5249 15.2975L16.6327 15.4521V17.149C16.6327 19.0756 16.6467 19.0006 16.2295 19.2162C15.9999 19.3334 15.8405 19.324 15.592 19.1693C15.442 19.0803 15.4374 19.0803 15.128 19.174C14.4014 19.4037 13.628 19.2303 13.0795 18.7193C12.3483 18.0303 12.1608 17.1209 12.578 16.2396C13.028 15.2693 14.1014 14.7959 15.1467 15.1053C15.4702 15.2037 15.4889 15.2037 15.578 15.124C15.7514 14.9693 16.0561 14.9553 16.3186 15.0959Z"
                      fill="white"
                    />
                    <path
                      d="M14.1251 16.4506C13.9283 16.5584 13.7642 16.7834 13.722 17.0084C13.6564 17.3506 13.8908 17.7678 14.2001 17.8662C14.4251 17.9412 14.8048 17.9037 14.9595 17.7865C15.1189 17.674 15.297 17.3272 15.297 17.1397C15.2923 16.9287 15.1376 16.6287 14.9642 16.5068C14.7533 16.3522 14.3501 16.3287 14.1251 16.4506Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.calories}
                </span>
              </div>
              <div>
                <p>Стоимость</p>
                <span>
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 0H2V9H0V11H2V13H0V15H2V18H4V15H8V13H4V11H8.5C11.54 11 14 8.54 14 5.5C14 2.46 11.54 0 8.5 0ZM8.5 9H4V2H8.5C10.43 2 12 3.57 12 5.5C12 7.43 10.43 9 8.5 9Z"
                      fill="white"
                    />
                  </svg>
                  {data?.val?.cost}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FirstBlock = () => {
  const store = useTouristDestinationsPageStore();

  const titleRef = useRef();

  useEffect(() => {
    const title = store?.first_block?.title.val;
    updateTextAndSetInnerHTML(titleRef.current, title);
  }, [store]);

  return (
    <div className={c.first_block}>
      <div className="_container">
        <h1 ref={titleRef}></h1>

        <Button to={store?.first_block?.button?.val?.link}>
          {store?.first_block?.button?.val?.text}
        </Button>
      </div>
    </div>
  );
};

const VideoBlock = () => {
  const store = useTouristDestinationsPageStore();

  const [text, setText] = useState([]);

  useEffect(() => {
    const title = store?.video_block?.text.val;
    setText(updateTextAndReturnArr(title));
  }, [store]);

  const playHandler = (e) => {
    const video = e.currentTarget.querySelector("video");

    if (!video) return;

    if (video.paused) {
      video.play();
      e.currentTarget.classList.remove(c["_paused"]);
      return;
    }

    video.pause();
    e.currentTarget.classList.add(c["_paused"]);
  };

  return (
    <div className={classNames(c.video_block, "_container")}>
      <div
        className={classNames(c.video_wrapper, c["_paused"])}
        onClick={playHandler}
      >
        <video
          loop
          muted
          paused="true"
          src={store.video_block?.video.val}
          poster={store.video_block?.poster.val}
          height={324}
        ></video>
      </div>

      <div className={c.text}>
        {text?.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className={c.features}>
        {Object.values(store.video_block?.features)?.map((feature, i) => (
          <p key={i}>
            <span>{feature?.val.title}</span>
            {feature?.val.text}
          </p>
        ))}
      </div>
    </div>
  );
};

const PeninsulaRoutesBlock = () => {
  const store = useTouristDestinationsPageStore();

  return (
    <div className={classNames(c.peninsula_routes_block, "_container")}>
      <h2>{store.peninsula_routes_block?.title?.val}</h2>

      <p className={c.sub_title}>
        {store.peninsula_routes_block?.sub_title?.val}
      </p>

      <div className={c.map}>
        <img src={routesMap} alt="" />

        <p className={c.magadan_text}>Магадан</p>

        {MAP_POINTS?.map((point) => (
          <Fragment key={point.id}>
            <MapPoint
              id={point.id}
              textOrientation={point.textOrientation}
              position={point.position}
              popupPosition={point?.popupPosition || ""}
              data={store.map_points[point.id]}
            />
            <hr className={c.dotted_line} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const RoutesOutsideTheCityBlock = () => {
  const store = useTouristDestinationsPageStore();

  return (
    <div className={classNames(c.routes_outside_theCity_block, "_container")}>
      <h2>{store.routes_outside_the_city_block?.title?.val}</h2>

      <div>
        <p className={c.title}>
          {store.routes_outside_the_city_block?.districts?.[1]?.val}
        </p>
        <div className={c.road}>
          <span className={c.dotted_wrapper}>
            <hr className={c.dotted_line} />
          </span>
          <MapPoint
            textOrientation="top"
            position={{ left: "20%", top: 0 }}
            data={store.outside_city_points[1]}
          >
            <b></b>
          </MapPoint>
          <MapPoint
            id={2}
            textOrientation="top"
            position={{ left: "50%", top: 0 }}
            data={store.outside_city_points[2]}
          >
            <b></b>
          </MapPoint>
        </div>
      </div>

      <div>
        <p className={c.title}>
          {store.routes_outside_the_city_block?.districts?.[2]?.val}
        </p>
        <div className={c.road}>
          <span className={c.dotted_wrapper}>
            <hr className={c.dotted_line} />
          </span>
          <MapPoint
            textOrientation="top"
            position={{ left: "20%", top: 0 }}
            data={store.outside_city_points[3]}
          >
            <b></b>
          </MapPoint>
        </div>
      </div>

      <div>
        <p className={c.title}>
          {store.routes_outside_the_city_block?.districts?.[3]?.val}
        </p>
        <div className={c.road}>
          <span className={c.dotted_wrapper}>
            <hr className={c.dotted_line} />
          </span>
          <MapPoint
            textOrientation="top"
            position={{ left: "20%", top: 0 }}
            data={store.outside_city_points[4]}
          >
            <b></b>
          </MapPoint>
        </div>
      </div>
    </div>
  );
};

const SeaRoutesBlock = () => {
  const store = useTouristDestinationsPageStore();

  const [activeRoute, setActiveRoute] = useState("");

  const onClick = (id) => {
    setActiveRoute((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="_container">
      <div className={c.sea_routes}>
        <h2>{store.sea_routes_block?.title.val}</h2>

        <p className={c.sub_title}>{store.sea_routes_block?.sub_title.val}</p>

        <div className={c.map}>
          <img src={seaMap} alt="" />

          {SEA_POINTS.map((point) => (
            <Fragment key={point?.id}>
              <MapPoint
                id={point?.id}
                textOrientation={point?.textOrientation}
                position={point?.position}
                data={store.sea_points[point?.id]}
                onClick={() => onClick(point?.id)}
                onClose={() => onClick(point?.id)}
              />

              <hr className={c.dotted_line} />

              <img
                className={classNames(
                  c.route,
                  activeRoute !== point?.id ? c._hidden : ""
                )}
                src={store.sea_points[point?.id]?.map_img?.val}
                alt=""
              />
            </Fragment>
          ))}

          <span
            style={{
              top: "14%",
              left: "45%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            мыс Чирикова
          </span>

          <span
            style={{
              top: "5%",
              left: "63.2%",
              fontSize: 10,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            Магадан
          </span>

          <span
            style={{
              top: "30%",
              left: "4%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            остров Талан
          </span>

          <span
            style={{
              top: "46%",
              left: "4%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            остров Спафарьева
          </span>

          <span
            style={{
              top: "62%",
              left: "68%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            мыс Таран
          </span>

          <span
            style={{
              top: "60%",
              left: "45%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            остров Завьялова
          </span>

          <span
            style={{
              bottom: "0",
              left: "72%",
              fontSize: 12,
              color: "#ACACAC",
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            мыс Алевина
          </span>
        </div>
      </div>
    </div>
  );
};

const IndividualTourBlock = () => {
  const store = useTouristDestinationsPageStore();

  return (
    <div className={classNames(c.individual_tour_block, "_container")}>
      <img src={store.individual_tour_block?.img?.val} alt="" />

      <div>
        <h2>{store.individual_tour_block?.title?.val}</h2>

        <p>{store.individual_tour_block?.text?.val}</p>

        <Button to={store.first_block?.button?.val?.link}>
          {store.first_block?.button?.val?.text}
        </Button>
      </div>
    </div>
  );
};

const JackLondonLakeBlock = () => {
  const store = useTouristDestinationsPageStore();

  return (
    <div className={classNames(c.jack_londonLake_block, "_container")}>
      <p className={c.sub_title}>{store.jack_london_lake_block?.text?.val}</p>

      <h2>{store.jack_london_lake_block?.title?.val}</h2>

      <Accordion accordion={store?.accordion} />

      <Button to="/jack-london-lake">
        {store.jack_london_lake_block?.button?.val}
      </Button>
    </div>
  );
};

export default Tours;
