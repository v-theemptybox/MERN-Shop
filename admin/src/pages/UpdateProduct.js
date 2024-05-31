import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();

  // if productId exist then update product
  useEffect(() => {
    if (productId) {
      // fetch room info from API when component load
      const fetchRoom = async () => {
        try {
          const response = await fetch(
            `https://vtechshop-be.onrender.com/admin/getProduct/${productId}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const resData = await response.json();
          console.log(resData);
          setName(resData.name);
          setPrice(resData.price);
          setShortDesc(resData.short_desc);
          setLongDesc(resData.long_desc);
          setCategory(resData.category);
          setStock(resData.stock || 0);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchRoom();
    }
  }, [productId]);

  // show alert message
  const showAlertMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // validate image files
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length !== 4) showAlertMessage("You must upload 4 images");
    else {
      setSelectedFiles(files);
    }
  };

  // validate form data
  const validateForm = () => {
    if (!name || !category || !shortDesc || !longDesc || !stock || !price) {
      showAlertMessage("Please fill in all value!");
      return false;
    }
    if (stock < 0 || price < 0) {
      showAlertMessage("Stock and Price must be greater than 0");
      return false;
    }
    return true;
  };

  const handleCreateProduct = async () => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("shortDesc", shortDesc);
        formData.append("longDesc", longDesc);
        formData.append("category", category);
        formData.append("stock", stock);
        selectedFiles.forEach((file) => {
          formData.append("uploadedImages", file);
        });

        const response = await fetch(
          "https://vtechshop-be.onrender.com/admin/postProduct",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (response.ok) {
          navigate("/products");
        }

        // const resData = await response.json();
        // console.log(resData.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("shortDesc", shortDesc);
        formData.append("longDesc", longDesc);
        formData.append("category", category);
        formData.append("stock", stock);
        selectedFiles.forEach((file) => {
          formData.append("uploadedImages", file);
        });

        const response = await fetch(
          `https://vtechshop-be.onrender.com/admin/putProduct/${productId}`,
          {
            method: "PUT",
            credentials: "include",
            body: formData,
          }
        );

        const resData = await response.json();
        if (response.ok) {
          navigate("/products");
        } else {
          showAlertMessage(resData.message);
        }

        // console.log(resData.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {message && (
        <div className="alert alert-primary position-absolute start-50">
          {message}
        </div>
      )}
      <div className="mt-5 border rounded shadow text-start py-4 px-3">
        <div className="mb-4">
          <h3>Create Product</h3>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="productCategory"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productShortDesc" className="form-label">
              Short Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="productShortDesc"
              placeholder="Enter Short Description"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productLongDesc" className="form-label">
              Long Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="productLongDesc"
              rows={4}
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalStock" className="form-label">
              Total Number of Products in Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="totalStock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImages" className="form-label">
              Upload Images (4 images)
            </label>
            <input
              className="form-control"
              type="file"
              id="productImages"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productId ? handleUpdateProduct : handleCreateProduct}
          >
            {productId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
