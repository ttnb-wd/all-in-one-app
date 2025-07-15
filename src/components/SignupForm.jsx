import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './SignupForm.css';

// Validation schemas for each step
const personalInfoSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  phone: yup.string().required('Phone number is required').matches(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format'),
});

const accountDetailsSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: yup.string().required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

const preferencesSchema = yup.object({
  newsletter: yup.boolean(),
  notifications: yup.boolean(),
  theme: yup.string().required('Please select a theme preference'),
  interests: yup.array().min(1, 'Please select at least one interest'),
});

const schemas = [personalInfoSchema, accountDetailsSchema, preferencesSchema];
const STORAGE_KEY = 'signup-form-progress';

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Initialize form with react-hook-form
  const methods = useForm({
    resolver: yupResolver(schemas[currentStep]),
    mode: 'onChange',
  });

  const { handleSubmit, reset, watch, formState: { errors, isValid } } = methods;

  // Load saved progress from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData || {});
        setCurrentStep(parsedData.currentStep || 0);
        reset(parsedData.formData || {});
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [reset]);

  // Save progress to localStorage whenever form data changes
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setFormData(prevFormData => {
          const updatedFormData = { ...prevFormData, ...value };
          
          // Save to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            formData: updatedFormData,
            currentStep,
          }));
          
          return updatedFormData;
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, currentStep]);

  const onSubmit = (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (currentStep < schemas.length - 1) {
      // Move to next step
      setCurrentStep(currentStep + 1);
      reset(updatedFormData);
    } else {
      // Final submission
      handleFinalSubmit(updatedFormData);
    }
  };

  const handleFinalSubmit = (finalData) => {
    console.log('Final form submission:', finalData);
    alert('Sign-up completed successfully!');
    
    // Clear saved progress
    localStorage.removeItem(STORAGE_KEY);
    
    // Reset form
    setCurrentStep(0);
    setFormData({});
    reset({});
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      reset(formData);
    }
  };

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(0);
    setFormData({});
    reset({});
  };

  const stepTitles = ['Personal Information', 'Account Details', 'Preferences'];

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-header">
          <h2>Create Your Account</h2>
          <div className="progress-bar">
            {stepTitles.map((title, index) => (
              <div
                key={index}
                className={`progress-step ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-title">{title}</div>
              </div>
            ))}
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="form-content">
            {currentStep === 0 && <PersonalInfoStep />}
            {currentStep === 1 && <AccountDetailsStep />}
            {currentStep === 2 && <PreferencesStep />}

            <div className="form-actions">
              {currentStep > 0 && (
                <button type="button" onClick={goToPreviousStep} className="btn btn-secondary">
                  Previous
                </button>
              )}
              
              <div className="right-actions">
                <button type="button" onClick={clearProgress} className="btn btn-link">
                  Clear Progress
                </button>
                <button type="submit" disabled={!isValid} className="btn btn-primary">
                  {currentStep === schemas.length - 1 ? 'Complete Sign-up' : 'Next'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

// Step 1: Personal Information
const PersonalInfoStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h3>Personal Information</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth *</label>
        <input
          type="date"
          id="dateOfBirth"
          {...register('dateOfBirth')}
          className={errors.dateOfBirth ? 'error' : ''}
        />
        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          placeholder="+1 (555) 123-4567"
          {...register('phone')}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
      </div>
    </div>
  );
};

// Step 2: Account Details
const AccountDetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h3>Account Details</h3>
      
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          type="text"
          id="username"
          {...register('username')}
          className={errors.username ? 'error' : ''}
        />
        {errors.username && <span className="error-message">{errors.username.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
      </div>
    </div>
  );
};

// Step 3: Preferences
const PreferencesStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-step">
      <h3>Preferences</h3>
      
      <div className="form-group">
        <label htmlFor="theme">Theme Preference *</label>
        <select
          id="theme"
          {...register('theme')}
          className={errors.theme ? 'error' : ''}
        >
          <option value="">Select a theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
        {errors.theme && <span className="error-message">{errors.theme.message}</span>}
      </div>

      <div className="form-group">
        <label>Interests * (Select at least one)</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="technology"
              {...register('interests')}
            />
            Technology
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="sports"
              {...register('interests')}
            />
            Sports
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="music"
              {...register('interests')}
            />
            Music
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="travel"
              {...register('interests')}
            />
            Travel
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="food"
              {...register('interests')}
            />
            Food & Cooking
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="books"
              {...register('interests')}
            />
            Books & Reading
          </label>
        </div>
        {errors.interests && <span className="error-message">{errors.interests.message}</span>}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register('newsletter')}
            />
            Subscribe to newsletter
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register('notifications')}
            />
            Enable push notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignupForm; 