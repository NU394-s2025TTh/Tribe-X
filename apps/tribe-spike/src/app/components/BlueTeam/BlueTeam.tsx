import { ITeamMember } from '../../teamMembers';
import { TeamMemberCard } from '../TeamMemberCard/TeamMemberCard';

interface IProps {
  members: ITeamMember[];
}

export function BlueTeam({ members }: IProps) {
  return (
    <div className="bg-blue-100 p-4 rounded shadow w-full">
      <h2 className="text-xl font-semibold mb-2 text-center">Blue Team</h2>
      <div className="grid grid-cols-2 gap-4 justify-items-center mb-4">
        {members.slice(0, 4).map((member) => (
          <TeamMemberCard key={member.email} member={member} />
        ))}
      </div>
      {members[4] && (
        <div className="flex justify-center">
          <TeamMemberCard key={members[4].email} member={members[4]} />
        </div>
      )}
    </div>
  );
}