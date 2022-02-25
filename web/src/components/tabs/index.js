import React from "react";

function Tabs(props) {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row border-b px-3"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + props.color + "-600"
                    : "text-" + props.color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                {props.title1}
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + props.color + "-600"
                    : "text-" + props.color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                {props.title2}
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + props.color + "-600"
                    : "text-" + props.color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                {props.title3}
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0">
            <div className="pr-3 py-5 flex-auto">
              <div className="tab-content tab-space px-5">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {props.tab1}
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {props.tab2}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {props.tab3}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;