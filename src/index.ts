import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const post = orm.em.create(Post, { title: "My first post", createdAt: new Date(), updatedAt: new Date() });
  await orm.em.persistAndFlush(post);
  console.log("----------sql 2----------");
  await orm.em.nativeInsert(post, { title: "My second post2" });
}

main().catch((err) => {
  console.error(err);
});  

// https://www.youtube.com/watch?v=I6ypD7qv3Z8