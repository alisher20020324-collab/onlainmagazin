import React, { useEffect } from "react";
import { Button, Flex, Form, Input, Modal, Space, Table, Tag } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { axiosInstanse } from "../api/axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
// import { useForm } from "antd/es/form/Form";
export default function AdminProduct() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const deleteProduct = async (id) => {
    console.log(id);
    try {
      let response = await axiosInstanse.delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const setValuesInputFn = (value) => {
    showModal();

    setEditId(value._id);
    form.setFieldsValue(value);
    setIsEdit(true);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "tile",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "id",
      render: (_, value) => <FaEdit onClick={() => setValuesInputFn(value)} />,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",
      render: (_, value) => (
        <MdDelete onClick={() => deleteProduct(value._id)} />
      ),
    },
  ];

  // Get All Category start
  const [product, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      let response = await axiosInstanse("/product");

      setProduct(response.data.allProduct);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Get All Product finish

  // Create start
  const createProduct = async (data) => {
    try {
      let response = await axiosInstanse.post("/product", data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      handleCancel();
      form.resetFields();
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };
  // Create finsih
  const UpadteProduct = async (data) => {
    try {
      let response = await axiosInstanse.put(`/product/${editId}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setIsEdit(false);
      setEditId(null);
      handleCancel();
      form.resetFields();
      getAllProduct();
    } catch (err) {
      console.log(err);
    }
  };

  // Open modal start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Open modal finish

  const onFinish = (values) => {
    if (isEdit) {
      UpadteProduct(values);
    } else {
      createProduct(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Product"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Image"
            name="image"
            rules={[
              { required: true, message: "Please input product image url!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input category title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please input prodcut desc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category ID"
            name="categoryId"
            rules={[{ required: true, message: "Please input category Id" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Almashtirish" : "Yaratish"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={product} />
    </>
  );
}
