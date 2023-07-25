import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRole(roleToVerify: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) return reply.status(401).send("Unauthorized");
  };
}
