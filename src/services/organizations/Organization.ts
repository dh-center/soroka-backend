import Organization from "../../models/organizations/Organization"
import User from "../../models/users/User"

class OrganizationService {
    async getAll(): Promise<any> {
        const organizations = await Organization.findAll()

        return {
            detail: organizations.map(
                (organization: Organization) => organization.toJSON()
            ),
            status: 200
        }
    }

    async getOwnersByOrganizationId(organizationId: number): Promise<any> {
        try {
            const users = await User.findAll({ where: { organization: organizationId } })

            return {
                detail: users.map((user: User) => {
                    return { name: user.name, id: user.id }
                }),
                status: 200
            }
        } catch (error) {
            return { detail: { detail: "Not found" }, status: 404 }
        }
    }
}

export default OrganizationService
