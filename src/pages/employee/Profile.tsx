import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiBriefcase, FiCalendar, FiGift, FiPhone, FiCode, FiBook, FiMapPin, FiLinkedin, FiInstagram, FiImage } from 'react-icons/fi';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  position?: string;
  birthday?: string;
  joinDate?: string;
  techStack?: string[];
  education?: string;
  location?: string;
  mobile?: string;
  profilePicture?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
  };
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<UserProfile>({
    id: '',
    email: '',
    name: '',
    role: '',
    position: '',
    birthday: '',
    joinDate: '',
    techStack: [],
    education: '',
    location: '',
    mobile: '',
    profilePicture: '',
    socialLinks: { linkedin: '', instagram: '' },
  });
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  // Debug user data and handle auth
  useEffect(() => {
    console.log('Profile: User from AuthContext:', user);
    if (user === null) {
      console.log('Profile: No user logged in, redirecting to login');
      navigate('/login');
    } else if (user) {
      setForm({
        id: user.id || '',
        email: user.email || '',
        name: user.name || '',
        role: user.role || '',
        position: user.position || 'Not set',
        birthday: user.birthday || '',
        joinDate: user.joinDate || '',
        techStack: user.techStack || [],
        education: user.education || '',
        location: user.location || '',
        mobile: user.mobile || '',
        profilePicture: user.profilePicture || '/default-avatar.png',
        socialLinks: {
          linkedin: user.socialLinks?.linkedin || '',
          instagram: user.socialLinks?.instagram || '',
        },
      });
      setIsLoading(false);
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserProfile> = {};
    if (!form.birthday) newErrors.birthday = 'Birthday is required';
    if (!form.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+\d{10,15}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile number must start with + followed by 10-15 digits';
    }
    if (form.socialLinks.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(form.socialLinks.linkedin)) {
      newErrors.socialLinks = { ...newErrors.socialLinks, linkedin: 'Invalid LinkedIn URL' };
    }
    if (form.socialLinks.instagram && !/^https?:\/\/(www\.)?instagram\.com\/.+$/.test(form.socialLinks.instagram)) {
      newErrors.socialLinks = { ...newErrors.socialLinks, instagram: 'Invalid Instagram URL' };
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Profile: Updated Profile:', form);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
      if (errors.socialLinks?.[field as keyof typeof errors.socialLinks]) {
        setErrors((prev) => ({
          ...prev,
          socialLinks: { ...prev.socialLinks, [field]: '' },
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof UserProfile]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, profilePicture: imageUrl }));
      console.log('Profile: Uploaded image:', imageUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100/50">
        <div className="text-gray-800 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100/50 px-2 sm:px-4 lg:px-6 pt-4 sm:pt-6 flex items-start justify-center">
      <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-lg border border-indigo-200/50 p-4 sm:p-6 w-full max-w-full overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img
                src={form.profilePicture}
                alt="Profile"
                className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-full object-cover border-2 border-gradient-to-r from-indigo-300 to-purple-300 shadow-md group-hover:scale-105 transition-all duration-200"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <FiImage className="text-white w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">{form.name}</h1>
              <p className="text-sm text-gray-600">{form.position}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-1.5 rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-lg hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiMail className="text-indigo-600 w-4 h-4" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiBriefcase className="text-indigo-600 w-4 h-4" /> Role
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiBriefcase className="text-indigo-600 w-4 h-4" /> Position
              </label>
              <input
                type="text"
                name="position"
                value={form.position}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiCalendar className="text-indigo-600 w-4 h-4" /> Join Date
              </label>
              <input
                type="text"
                name="joinDate"
                value={form.joinDate}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiGift className="text-indigo-600 w-4 h-4" /> Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {errors.birthday && (
                <p className="text-xs text-red-500 mt-1">{errors.birthday}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiPhone className="text-indigo-600 w-4 h-4" /> Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3 py-1.5 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiCode className="text-indigo-600 w-4 h-4" /> Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                value={form.techStack?.join(', ') || ''}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiBook className="text-indigo-600 w-4 h-4" /> Education
              </label>
              <input
                type="text"
                name="education"
                value={form.education}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiMapPin className="text-indigo-600 w-4 h-4" /> Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                disabled
                className="w-full px-3 py-1.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiLinkedin className="text-indigo-600 w-4 h-4" /> LinkedIn
              </label>
              <input
                type="text"
                name="socialLinks.linkedin"
                value={form.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full px-3 py-1.5 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {errors.socialLinks?.linkedin && (
                <p className="text-xs text-red-500 mt-1">{errors.socialLinks.linkedin}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1">
                <FiInstagram className="text-indigo-600 w-4 h-4" /> Instagram
              </label>
              <input
                type="text"
                name="socialLinks.instagram"
                value={form.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://www.instagram.com/username"
                className="w-full px-3 py-1.5 text-sm text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
              />
              {errors.socialLinks?.instagram && (
                <p className="text-xs text-red-500 mt-1">{errors.socialLinks.instagram}</p>
              )}
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center gap-3 mt-3 sm:mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-1.5 rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-lg hover:scale-105"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-lg hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiMail className="text-indigo-600 w-4 h-4" /> Email
              </p>
              <p className="text-sm text-gray-600">{form.email || 'Not set'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiBriefcase className="text-indigo-600 w-4 h-4" /> Role
              </p>
              <p className="text-sm text-gray-600">{form.role || 'Not set'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiBriefcase className="text-indigo-600 w-4 h-4" /> Position
              </p>
              <p className="text-sm text-gray-600">{form.position || 'Not set'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiCalendar className="text-indigo-600 w-4 h-4" /> Join Date
              </p>
              <p className="text-sm text-gray-600">{form.joinDate || 'Not set'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiGift className="text-indigo-600 w-4 h-4" /> Birthday
              </p>
              <p className="text-sm text-gray-600">{form.birthday || 'Not set'}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiPhone className="text-indigo-600 w-4 h-4" /> Mobile Number
              </p>
              <p className="text-sm text-gray-600">{form.mobile || 'Not set'}</p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiCode className="text-indigo-600 w-4 h-4" /> Tech Stack
              </p>
              <p className="text-sm text-gray-600">{form.techStack?.join(', ') || 'Not set'}</p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiBook className="text-indigo-600 w-4 h-4" /> Education
              </p>
              <p className="text-sm text-gray-600">{form.education || 'Not set'}</p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiMapPin className="text-indigo-600 w-4 h-4" /> Location
              </p>
              <p className="text-sm text-gray-600">{form.location || 'Not set'}</p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiLinkedin className="text-indigo-600 w-4 h-4" /> LinkedIn
              </p>
              <p className="text-sm text-gray-600">
                {form.socialLinks.linkedin ? (
                  <a href={form.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {form.socialLinks.linkedin}
                  </a>
                ) : (
                  'Not set'
                )}
              </p>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <FiInstagram className="text-indigo-600 w-4 h-4" /> Instagram
              </p>
              <p className="text-sm text-gray-600">
                {form.socialLinks.instagram ? (
                  <a href={form.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {form.socialLinks.instagram}
                  </a>
                ) : (
                  'Not set'
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}