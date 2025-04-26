import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  birthday?: string;
  joinDate?: string;
  techStack?: string[];
  education?: string;
  location?: string;
  mobile?: string;
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
    birthday: '',
    joinDate: '',
    techStack: [],
    education: '',
    location: '',
    mobile: '',
    socialLinks: { linkedin: '', instagram: '' },
  });
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  // Debug user data and handle auth
  useEffect(() => {
    console.log('Profile: User from AuthContext:', user);
    if (user === null) {
      console.log('Profile: No user logged in, redirecting to login');
      navigate('/employee/profile');
    } else if (user) {
      setForm({
        id: user.id || '',
        email: user.email || '',
        name: user.name || '',
        role: user.role || '',
        birthday: user.birthday || '',
        joinDate: user.joinDate || '',
        techStack: user.techStack || [],
        education: user.education || '',
        location: user.location || '',
        mobile: user.mobile || '',
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-indigo-100/50">
        <div className="text-gray-800 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center bg-gradient-to-b from-gray-100 to-indigo-100/50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 min-h-screen">
      <div className="bg-gradient-to-b from-white to-indigo-50/30 rounded-xl shadow-xl border border-indigo-100/50 p-4 sm:p-6 lg:p-8 w-full max-w-full sm:max-w-lg lg:max-w-2xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border-2 border-indigo-200 shadow-sm">
            <span className="text-lg sm:text-xl font-medium">
              {form.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </span>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Join Date
              </label>
              <input
                type="text"
                name="joinDate"
                value={form.joinDate}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm focus:scale-[1.02]"
              />
              {errors.birthday && (
                <p className="text-xs sm:text-sm text-red-500 mt-1 transition-opacity duration-200">{errors.birthday}</p>
              )}
            </div>
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm focus:scale-[1.02]"
              />
              {errors.mobile && (
                <p className="text-xs sm:text-sm text-red-500 mt-1 transition-opacity duration-200">{errors.mobile}</p>
              )}
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Tech Stack
              </label>
              <input
                type="text"
                name="techStack"
                value={form.techStack?.join(', ') || ''}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Education
              </label>
              <input
                type="text"
                name="education"
                value={form.education}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                disabled
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                name="socialLinks.linkedin"
                value={form.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm focus:scale-[1.02]"
              />
              {errors.socialLinks?.linkedin && (
                <p className="text-xs sm:text-sm text-red-500 mt-1 transition-opacity duration-200">{errors.socialLinks.linkedin}</p>
              )}
            </div>
            <div className="col-span-1 lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
                Instagram
              </label>
              <input
                type="text"
                name="socialLinks.instagram"
                value={form.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://www.instagram.com/username"
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm focus:scale-[1.02]"
              />
              {errors.socialLinks?.instagram && (
                <p className="text-xs sm:text-sm text-red-500 mt-1 transition-opacity duration-200">{errors.socialLinks.instagram}</p>
              )}
            </div>
            <div className="col-span-1 lg:col-span-2 flex justify-center gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:scale-105"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Name</p>
              <p className="text-sm sm:text-base text-gray-600">{form.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Email</p>
              <p className="text-sm sm:text-base text-gray-600">{form.email || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Role</p>
              <p className="text-sm sm:text-base text-gray-600">{form.role || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Join Date</p>
              <p className="text-sm sm:text-base text-gray-600">{form.joinDate || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Birthday</p>
              <p className="text-sm sm:text-base text-gray-600">{form.birthday || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-800">Mobile Number</p>
              <p className="text-sm sm:text-base text-gray-600">{form.mobile || 'Not set'}</p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">Tech Stack</p>
              <p className="text-sm sm:text-base text-gray-600">{form.techStack?.join(', ') || 'Not set'}</p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">Education</p>
              <p className="text-sm sm:text-base text-gray-600">{form.education || 'Not set'}</p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">Location</p>
              <p className="text-sm sm:text-base text-gray-600">{form.location || 'Not set'}</p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">LinkedIn</p>
              <p className="text-sm sm:text-base text-gray-600">
                {form.socialLinks.linkedin ? (
                  <a href={form.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {form.socialLinks.linkedin}
                  </a>
                ) : (
                  'Not set'
                )}
              </p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">Instagram</p>
              <p className="text-sm sm:text-base text-gray-600">
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