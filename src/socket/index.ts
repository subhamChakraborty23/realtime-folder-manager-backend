import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import Folder from "../models/folder.model";
import Item from "../models/item.model";

export const configureSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
      socket.on("createItem", async (item) => {
        if (!item.title || item.title.trim() === "") {
          console.log("Item creation failed: Title is required");
          return;
        }
        const newItem = await Item.create(item);
        io.emit("itemCreated", newItem);
      });

      socket.on("createFolder", async (folder) => {
        const newFolder = await Folder.create(folder);
        io.emit("folderCreated", newFolder);
      });

      socket.on('updateElement', async ({ id, updates }) => {
        try {
          let updated;
          
          // Check if the element is an item
          const itemExists = await Item.exists({ _id: id });
          if (itemExists) {
            updated = await Item.findByIdAndUpdate(
              id,
              { $set: updates },
              { new: true, lean: true }
            );
          } else {
            updated = await Folder.findByIdAndUpdate(
              id,
              { $set: updates },
              { new: true, lean: true }
            );
          }
      
          if (updated) {
            io.emit('elementUpdated', updated);
          }
        } catch (error) {
          console.error('Error updating element:', error);
        }
      });

      socket.on("requestInitialData", async () => {
        const [items, folders] = await Promise.all([
          Item.find().lean(),
          Folder.find().lean(),
        ]);
        socket.emit("initialData", { items, folders });
      });
    });

    return io;
};
