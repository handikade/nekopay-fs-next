import { ServiceError } from "@/lib/service-error";
import type { Session } from "next-auth";
import { PartnerServiceFactory } from "./service";

// Mock the repository dependency
const mockRepo = {
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
};

// Create a service instance with the mock repository
const partnerService = PartnerServiceFactory(mockRepo);

// Mock data for testing
const mockSession: Session = {
  user: {
    id: "user-123",
    email: "test@example.com",
    name: "Test User",
  },
  expires: "1",
};

const mockPartnerId = "partner-456";

const validCreatePayload = {
  type: "supplier",
  partner_number: "PN-001",
  name: "Test Partner",
  email: "partner@example.com",
  phone: "1234567890",
};

const validUpdatePayload = {
  name: "Updated Test Partner",
  phone: "0987654321",
};

describe("PartnerServiceFactory", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a partner successfully with a valid payload and session", async () => {
      const mockCreatedPartner = {
        ...validCreatePayload,
        _id: mockPartnerId,
        user_id: mockSession.user.id,
        created_by: mockSession.user.email,
      };
      mockRepo.create.mockResolvedValue(mockCreatedPartner);

      const result = await partnerService.create(
        validCreatePayload,
        mockSession
      );

      expect(mockRepo.create).toHaveBeenCalledTimes(1);
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...validCreatePayload,
        user_id: mockSession.user.id,
        created_by: mockSession.user.email,
      });
      expect(result).toEqual(mockCreatedPartner);
    });

    it("should throw a ServiceError if the session is null", async () => {
      await expect(
        partnerService.create(validCreatePayload, null)
      ).rejects.toThrow(
        new ServiceError(401, "You must be logged in to create a partner.")
      );
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it("should throw a ServiceError for invalid payload", async () => {
      const invalidPayload = { ...validCreatePayload, email: "not-an-email" };

      await expect(
        partnerService.create(invalidPayload, mockSession)
      ).rejects.toThrow(ServiceError);

      try {
        await partnerService.create(invalidPayload, mockSession);
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError);
        expect((error as ServiceError).status).toBe(400);
        expect((error as ServiceError).message).toBe("Invalid input data");
        expect((error as ServiceError).details).toBeDefined();
      }

      expect(mockRepo.create).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a partner successfully with a valid payload and session", async () => {
      const mockUpdatedPartner = {
        _id: mockPartnerId,
        ...validUpdatePayload,
      };
      mockRepo.update.mockResolvedValue(mockUpdatedPartner);

      const result = await partnerService.update(
        mockPartnerId,
        validUpdatePayload,
        mockSession
      );

      expect(mockRepo.update).toHaveBeenCalledTimes(1);
      expect(mockRepo.update).toHaveBeenCalledWith(
        mockPartnerId,
        validUpdatePayload
      );
      expect(result).toEqual(mockUpdatedPartner);
    });

    it("should throw a ServiceError if the session is null", async () => {
      await expect(
        partnerService.update(mockPartnerId, validUpdatePayload, null)
      ).rejects.toThrow(
        new ServiceError(401, "You must be logged in to update a partner.")
      );
      expect(mockRepo.update).not.toHaveBeenCalled();
    });

    it("should throw a ServiceError for invalid payload (e.g., empty object)", async () => {
      const invalidPayload = {};

      await expect(
        partnerService.update(mockPartnerId, invalidPayload, mockSession)
      ).rejects.toThrow(ServiceError);

      try {
        await partnerService.update(mockPartnerId, invalidPayload, mockSession);
      } catch (error) {
        expect(error).toBeInstanceOf(ServiceError);
        expect((error as ServiceError).status).toBe(400);
        expect((error as ServiceError).message).toBe("Invalid input data");
        expect((error as ServiceError).details).toBeDefined();
      }

      expect(mockRepo.update).not.toHaveBeenCalled();
    });

    it("should throw a ServiceError if the partner is not found", async () => {
      // Mock repository to return null, simulating a not-found case
      mockRepo.update.mockResolvedValue(null);

      await expect(
        partnerService.update(mockPartnerId, validUpdatePayload, mockSession)
      ).rejects.toThrow(new ServiceError(404, "Partner not found."));

      expect(mockRepo.update).toHaveBeenCalledTimes(1);
    });
  });
});
