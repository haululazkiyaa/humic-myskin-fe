import { useState } from "react";
import AuthForm from "./AuthForm";
import AuthFormDoctor from "./signUpDoctor/AuthFormDoctor";
import PropTypes from "prop-types";

const AuthModalController = ({ onClose, type }) => {
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [currentType, setCurrentType] = useState(type);

  const handleOpenDoctorForm = () => {
    setShowDoctorForm(true);
  };

  const handleCloseAll = () => {
    setShowDoctorForm(false);
    if (onClose) onClose();
  };

  const handleBackToLogin = () => {
    setShowDoctorForm(false);
    setCurrentType("login"); 
  };

  if (showDoctorForm) {
    return (
      <AuthFormDoctor
        onBackToLogin={handleBackToLogin}
        onClose={handleCloseAll}
      />
    );
  }

  return (
    <AuthForm
      onClose={handleCloseAll}
      showLogin={currentType}
      onOpenDoctorForm={handleOpenDoctorForm}
    />
  );
};

AuthModalController.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.string,
};

export default AuthModalController;
