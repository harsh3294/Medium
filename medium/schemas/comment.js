export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    { name: "name", type: "string", title: "Name" },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comments won't show on the site wuthout being approved.",
    },
    { name: "email", type: "string", title: "Email" },
    { name: "comment", type: "text", title: "Comment" },
    { name: "post", type: "reference", to: [{ type: "post" }] },
  ],
};
