import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActons } from "../../store/user-reducer";

const Downloads = () => {
  const dispatch = useDispatch();
  const downloads = useSelector((state) => state.user.downloads);
  useEffect(() => {
    const getDownload = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const downloads = await axios.get(
          "http://localhost:3000/users/get-downloads",
          { headers: { Authorization: token } }
        );
        dispatch(userActons.getDownloads({ downloads: downloads.data }));
      } catch (error) {
        console.log(error);
      }
    };
    getDownload();
  }, []);
  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h3 className="title">Downloads</h3>
        <table className="table">
          <thead className="tHeads">
            <tr>
              <th>Slno</th>
              <th>File Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((download, index) => (
              <tr className="leader" key={index}>
                <td>{download.id}</td>
                <td>
                  {
                    <a className="expA" href="download.file_url">
                      Expenses
                    </a>
                  }
                </td>
                <td>{download.createdAt.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Downloads;
