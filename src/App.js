import { Button, Modal, Table } from "antd";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dataTable = data.map((user, key) => ({
          ...user,
          key: key,
          address: ` ${user?.address?.street}, ${user?.address?.city}`,
          company: user?.company?.name,
        }));
        setUsers(dataTable);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetail = async (id) => {
    setIsLoading(true);
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
    console.log(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, user) => (
        <a onClick={() => handleDetail(user.id)}>{name}</a>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      key: "company",
      title: "Company",
      dataIndex: "company",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={users} loading={isLoading} />
      <Modal
        loading={isLoading}
        title="User detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Name: {user?.name}</p>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>
          Address: {user?.address.street}, {user?.address.city}
        </p>
        <p>Phone: {user?.phone}</p>
        <p>Website: {user?.website}</p>
        <p>Company: {user?.company.name}</p>
      </Modal>
    </>
  );
};

export default App;
