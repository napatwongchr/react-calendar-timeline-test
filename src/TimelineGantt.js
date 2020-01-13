import React, { useState, Component } from "react";
import moment from "moment";
import { css } from "emotion";
import { Row, Col, Icon, Checkbox, Pagination } from "antd";
import { useDrag, useDrop } from "react-dnd";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  RowItems,
  GroupRow,
  HelpersContext
} from "./react-calendar-timeline-modify";

import { itemsMock, groupsMock } from "./data";

import MoreDetailsIcon from "./icons/MoreDetailIcon";
import CriticalStatusIcon from "./icons/CriticalStatusIcon";
import "./Timeline.css";
import "./Pagination.css";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

const ITEM_STATUS = {
  green: "#0EC3AE",
  purple: "#402FC6",
  blue: "#008DFF",
  lightblue: "#19CCDB",
  grey: "#6A6A6A",
  orange: "#FF8900"
};

const defaultTimeStart = moment()
  .startOf("day")
  .toDate();
const defaultTimeEnd = moment()
  .startOf("day")
  .add(1, "day")
  .toDate();

class TimelineGantt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: itemsMock,
      groups: groupsMock,
      itemsToDrag: [
        {
          title: "print",
          id: "0a",
          startTime: moment()
            .startOf("day")
            .add(2, "h"),
          endTime: moment()
            .startOf("day")
            .add(4, "h")
        },
        {
          title: "test",
          id: "1b",
          startTime: moment()
            .startOf("day")
            .add(2, "h"),
          endTime: moment()
            .startOf("day")
            .add(4, "h")
        }
      ]
    };
  }

  handleDrop = group => item => {
    const fullItem = this.state.itemsToDrag.find(i => i.id === item.id);
    this.setState(
      state => ({
        items: [
          ...state.items,
          {
            title: fullItem.title,
            id: item.id,
            group: group.id,
            start_time: item.startTime.valueOf(),
            end_time: item.endTime.valueOf(),
            color: "blue",
            bgColor: "lightred"
          }
        ]
      }),
      () => {
        console.log("Do some request ...");
      }
    );
  };

  handleItemMove = (itemId, dragTime, newGroupId) => {
    const { items } = this.state;
    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start_time: dragTime,
              end_time: dragTime + (item.end_time - item.start_time),
              group: newGroupId
            })
          : item
      )
    });
  };

  render() {
    const { items, groups } = this.state;
    return (
      <div data-testid="timeline-gantt">
        <div style={{ display: "flex", marginBottom: 10 }}>
          {this.state.itemsToDrag.map(dragItem => {
            return (
              <Draggable
                key={dragItem.id}
                id={dragItem.id}
                itemDetails={{ ...dragItem }}
                style={{
                  height: "100%",
                  width: 100,
                  background: "white",
                  marginLeft: 15,
                  border: "1px solid black",
                  padding: 5
                }}
                onDragEnd={item => console.log("dragEnd", item)}
                onDragStart={item => console.log("dragStart", item)}
              >
                {dragItem.title}
              </Draggable>
            );
          })}
        </div>
        <Row
          className={css`
            background-color: white;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            padding: 20px 15px;
            border: 1px solid #ebebeb;
            border-width: 1px 1px 0 1px;
          `}
        >
          Gantt
        </Row>
        <Timeline
          // keys={keys}
          groups={groups}
          items={items}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          canMove={true}
          canResize={"both"}
          lineHeight={75}
          sidebarWidth={170}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          itemRenderer={itemRenderer}
          groupRenderer={groupRenderer}
          rowRenderer={props => {
            const { rowData, getLayerRootProps, group } = props;
            const helpers = React.useContext(HelpersContext);
            const { itemsToDrag } = rowData;
            return (
              <GroupRow>
                <RowItems />
                <DroppablesLayer
                  getLayerRootProps={getLayerRootProps}
                  itemsToDrag={itemsToDrag}
                  getLeftOffsetFromDate={helpers.getLeftOffsetFromDate}
                  handleDrop={this.handleDrop}
                  group={group}
                  helpers={helpers}
                />
              </GroupRow>
            );
          }}
          rowData={{
            itemsToDrag: this.state.itemsToDrag
          }}
          minZoom={60 * 60 * 1000}
          maxZoom={8.64e7}
          onItemMove={this.handleItemMove}
        >
          <TimelineHeaders>
            <SidebarHeader
              className={css`
                padding: 10px;
                background-color: #f5f5f5;
              `}
            >
              {({ getRootProps }) => {
                return (
                  <Row
                    {...getRootProps()}
                    className={css`
                      label: technician-row-header;
                      padding: 13px 15px;
                      background-color: #f5f5f5;
                      box-shadow: 2px -2px 3px 0px rgba(0, 0, 0, 0.04);
                      z-index: 9999;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    All Technicians
                  </Row>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader test-id="test" />
          </TimelineHeaders>
          <TimelineMarkers>
            <CustomMarker date={moment.now()}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: "red",
                  width: "2px",
                  height: "600px"
                };
                return <div style={customStyles} onClick={() => {}} />;
              }}
            </CustomMarker>
          </TimelineMarkers>
        </Timeline>
        <Row
          type="flex"
          justify="space-between"
          className={css`
            background-color: white;
            color: hsl(0, 0%, 50%);
            padding: 20px 15px;
            border: 1px solid #ebebeb;
          `}
        >
          <Col
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <Row type="flex">
              <Col
                className={css`
                  margin-right: 30px;
                `}
              >
                <span
                  className={css`
                    margin-right: 10px;
                  `}
                >
                  Rows per page: 20
                </span>
                <Icon type="down" />
              </Col>
              <Col>
                <Checkbox onChange={() => {}} />
                <span
                  className={css`
                    margin-left: 10px;
                  `}
                >
                  Only Own User
                </span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Pagination defaultCurrent={1} total={500} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TimelineGantt;

function Droppable({ children, itemIdAccepts, style, onDrop, ...rest }) {
  const [collected, droppableRef] = useDrop({
    drop: (item, monitor) => {
      console.log(monitor, ";;;dropmonitor");
      onDrop(item);
    },
    accept: itemIdAccepts,
    collect: monitor => ({
      canDrop: monitor.canDrop()
    }),
    hover: (item, monitor) => {
      console.log(monitor, ";;;hoveritem");
    }
  });
  const isVisable = collected.canDrop;
  return (
    <div
      style={{
        ...style,
        display: isVisable ? "initial" : "none"
      }}
      ref={droppableRef}
      {...rest}
    >
      {children}
    </div>
  );
}

function Draggable({
  id,
  children,
  onDragStart,
  onDragEnd,
  itemDetails,
  ...rest
}) {
  const [collectedProps, dragRef] = useDrag({
    item: { id, type: id, ...itemDetails },
    begin: monitor => {
      onDragStart(id);
    },
    end: (item, monitor) => {
      console.log(monitor);
      onDragEnd(item);
    }
  });
  return (
    <div {...rest} ref={dragRef}>
      {children}
    </div>
  );
}
function DroppablesLayer({
  getLayerRootProps,
  itemsToDrag,
  getLeftOffsetFromDate,
  handleDrop,
  group,
  helpers
}) {
  // we need get date when drag over some period of time
  return (
    <div {...getLayerRootProps()}>
      {itemsToDrag.map((item, index) => {
        const leftTimeBoundary = getLeftOffsetFromDate(
          moment()
            .startOf("day")
            .subtract(1, "week")
            .valueOf()
        );
        const rightTimeBoundary = getLeftOffsetFromDate(
          moment()
            .startOf("day")
            .add(1, "week")
            .valueOf()
        );
        // console.log(helpers.getItemDimensions)
        // console.log(helpers);
        return (
          <Droppable
            key={index}
            style={{
              position: "absolute",
              left: leftTimeBoundary,
              width: rightTimeBoundary - leftTimeBoundary,
              backgroundColor: "purple",
              height: "100%"
              // zIndex: 999999
            }}
            itemIdAccepts={item.id}
            onDrop={handleDrop(group)}
          >
            {item.title}
          </Droppable>
        );
      })}
    </div>
  );
}

function groupRenderer({ group }) {
  return (
    <Row type="flex">
      <Col
        className={css`
          margin-right: 10px;
        `}
      >
        <img src={group.avatar} alt={group.title} />
      </Col>
      <Col>
        <p
          className={css`
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {group.title}
        </p>
      </Col>
    </Row>
  );
}

function itemRenderer({ item, itemContext, getItemProps, getResizeProps }) {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor: ITEM_STATUS[item.color] || ITEM_STATUS.green,
          color: "white",
          borderWidth: 0,
          borderRadius: 3,
          borderLeftWidth: itemContext.selected ? 3 : 0,
          borderRightWidth: itemContext.selected ? 3 : 0,
          lineHeight: "40px"
        },
        onMouseDown: () => {
          console.log("on item click", item);
        }
      })}
    >
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: ${itemContext.dimensions.height}px;
          padding-left: 10px;
          padding-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          {item.isCritical && (
            <div
              className={css`
                margin-right: 10px;
              `}
            >
              <CriticalStatusIcon />
            </div>
          )}

          <div
            className={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <span
              className={css`
                font-size: 14px;
              `}
            >
              {itemContext.title}
            </span>
            <span
              className={css`
                font-size: 12px;
                margin-top: 20px;
              `}
            >
              8 AM - 9 AM
            </span>
          </div>
        </div>

        <div>
          <MoreDetailsIcon />
        </div>
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
    </div>
  );
}
