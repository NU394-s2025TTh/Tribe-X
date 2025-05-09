import { ITeamMember } from '../../teamMembers';

interface TeamMemberCardProps {
  member: ITeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className={`text-center w-80 p-3 rounded-lg shadow mb-2 xl:m-0 ${member.team == "Blue" ? "bg-blue-300" : "bg-red-300"}`}>
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-20 h-20 rounded-full border m-auto"
      />
      <div>
        <p>{member.name}</p>
        <a href={`mailto:${member.email}`} className={`text-sm ${member.team == "Blue" ? "text-blue-600 underline" : "text-red-600 underline"}`}>
          {member.email}
        </a>
      </div>
    </div>
  );
}