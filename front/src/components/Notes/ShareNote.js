import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { shareExistingNote } from "../../redux/actions/noteActions";
import { getUserByEmail } from "../../services/noteService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareNote = () => {
  const { noteId } = useParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShare = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get user ID by email
      const user = await getUserByEmail(email);

      // Dispatch the shareExistingNote action with noteId and userId
      dispatch(shareExistingNote(noteId, user._id));

      toast.success("Note shared with user successfully!");

      // Redirect after a short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error(error.message || "Error sharing note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="font-form-title mb-5">Share Note</h2>
      <form onSubmit={handleShare}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label font-form-title">
            User Email to Share With
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user ID"
          />
        </div>
        <button type="submit" className="btn btn-info" disabled={loading}>
          {loading ? "Sharing..." : "Share Note"}
        </button>
      </form>
    </div>
  );
};

export default ShareNote;
