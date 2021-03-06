import { inject } from 'aurelia-framework';
import { UserService } from '~/services/user-service';
import { ProjectService } from '~/services/project-service';
import { ProjectRoleService } from '~/services/project-role-service';

@inject(UserService, ProjectService, ProjectRoleService)
export class Profile {
    constructor(_user, _project, _role) {
        this.user = {};
        this.userLoaded = false;
        this._user = _user;
        this._project = _project;
        this._role = _role;
    }

    async attached() {
        this.user = await this._user.currentUser();
        const { projectId, position } = this.user;
        const { name : projectName } = !!projectId ? await this._project.getProject(this.user.projectId) : {};
        const { name : role } = !!position ? await this._role.getProjectRole(this.user.position) : {};

        this.user.project = projectName;
        this.user.role = role;
        this.userLoaded = true;
    }
}
