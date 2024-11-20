function ProfileView({ profile }) {
  if (!profile) {
    return <div>Loading...</div>; // Or any loading/fallback UI
  }

  const { avatar, username, email, bio, groups, cohorts } = profile;

  return (
    <div className="profile-view">
      <div className="avatar">
        <img src={avatar || "/default-avatar.jpg"} alt="Avatar" />
      </div>
      <h2>{username}</h2>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
      <div>
        <h3>Groups:</h3>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>{group}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Cohorts:</h3>
        <ul>
          {cohorts.map((cohort, index) => (
            <li key={index}>{cohort}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileView;
