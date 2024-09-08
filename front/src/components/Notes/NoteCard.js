import React from "react";
import { useNavigate } from "react-router-dom";
import "./note.css";

const NoteCard = ({ note, onDelete, shared }) => {
  const navigate = useNavigate();
  const colors = ["blue", "green", "purple", "yellow", "orange"];

  const handleEdit = () => {
    if (shared) {
      navigate(`/notes/realtime/${note._id}`); // Navigate to real-time editor if the note is shared
    } else {
      navigate(`/notes/${note._id}`); // Navigate to regular edit page
    }
  };

  const handleShare = () => {
    navigate(`/notes/share/${note._id}`);
  };

  // Limit content to 200 characters
  const truncatedContent =
    note.content.length > 200
      ? `${note.content.substring(0, 200)}...`
      : note.content;

  // Randomly select a color for the background
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="container bootstrap snippets bootdeys">
      <div className="row">
        <div className="col-md-12 col-sm-12 content-card">
          <div className="card-big-shadow">
            <div
              className="card card-just-text"
              data-background="color"
              data-color={randomColor}
              data-radius="none"
            >
              <div className="content">
                <h6 className="category">{note.title}</h6>
                <p className="description">{truncatedContent}</p>
                {/* <h4 class="title"><a href="#">Blue Card</a></h4> */}

                {!shared ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="btn btn-warning me-2 buttons"
                    >
                      Edit
                    </button>
                    <button
                      onClick={onDelete}
                      className="btn btn-danger me-2 buttons"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleShare}
                      className="btn btn-info buttons"
                    >
                      Share
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="btn btn-warning me-2 buttons"
                  >
                    Real Time Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
