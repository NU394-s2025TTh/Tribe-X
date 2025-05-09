import { ITeamMember } from '../../teamMembers';
import { TeamMemberCard } from '../TeamMemberCard/TeamMemberCard';

interface IProps {
  members: ITeamMember[];
}

export function RedTeam({ members }: IProps) {
  return (
    <div className="bg-red-100 p-4 rounded shadow w-full justify-items-center">
      <h2 className="text-xl font-semibold mb-2 text-center">Red Team</h2>
      <div className="xl:grid xl:grid-cols-2 xl:gap-4 xl:justify-items-center xl:mb-4 justify-center">
        {members.slice(0, 4).map((member) => (
          <TeamMemberCard key={member.email} member={member} />
        ))}
      </div>
      {members[4] && (
        <div className="xl:flex justify-center">
          <TeamMemberCard key={members[4].email} member={members[4]} />
        </div>
      )}
    </div>
  );
}