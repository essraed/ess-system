import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
  Divider,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { NotificationIcon } from "../icons/NotificationIcon";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import toast from "react-hot-toast";

const NotificationsDropdown = () => {
  const navigate = useNavigate();
  const {
    notificationStore: {
      notifications,
      unreadCount,
      loadNotifications,
      initializeSignalR,
      stopConnection,
      ReadToggle,
      setCountParam,
      setIsReadParam,
    },
  } = useStore();

  async function handleReadedToggle(e: React.MouseEvent, id: string) {
    // e.stopPropagation();
    // e.preventDefault();
    const result = await ReadToggle(id);

    if (result.status === "success") {
      updateNotifications();
    } else {
      toast.error(result.error as string);
    }
  }

  const updateNotifications = async () => {
    await setIsReadParam(false);
    await setCountParam(9);
    await loadNotifications();
  };

  useEffect(() => {
    initializeSignalR();

    return () => {
      stopConnection();
    };
  }, []);

  useEffect(() => {
    updateNotifications();
  }, [loadNotifications]);

  if (!notifications) return <p>Loading.......</p>;

  return (
    <>
      {notifications.length > 0 && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <NavbarItem>
              <Badge
                content={notifications?.length}
                shape="circle"
                color="danger"
              >
                <NotificationIcon size={24} />
              </Badge>
            </NavbarItem>
          </DropdownTrigger>
          <DropdownMenu
            className="w-80"
            aria-label="Notifications"
            closeOnSelect={false} 
          >
            <DropdownSection title={`${unreadCount} Unread`}>
              {notifications?.slice(0, 5).map((item, index) => ( 
                <DropdownItem
                  onClick={(e) => {
                    // handleReadedToggle(e, item.id);
                    if (item.moreDetailsUrl) {
                      navigate(`/listings/${item.moreDetailsUrl}`);
                    }
                  }}
                  classNames={{
                    base: "py-2",
                    title: "text-base font-semibold",
                  }}
                  key={index}
                  description={item.message}
                >
                  <Link to="#" className="flex items-center justify-between">
                    {item.isRead ? (
                      <Link
                        className="p-2 hover:bg-gray-800 rounded-full"
                        to="#"
                        onClick={(e) => handleReadedToggle(e, item.id)}
                      >
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      </Link>
                    ) : (
                      <Link
                        className="p-2 hover:bg-green-800 rounded-full"
                        to="#"
                        onClick={(e) => handleReadedToggle(e, item.id)}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </Link>
                    )}

                    {item.title}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key={""}>
                <Divider />
              </DropdownItem>
              <DropdownItem key={""}>
                {notifications.length > 5 && (
                  <Link
                    to="/listings/notifications"
                    className="flex items-center align-middle"
                  >
                    View All
                  </Link>
                )}
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default observer(NotificationsDropdown);
