interface CompanySelectorProps {
  companies: string[];
}

const CompanySelector = ({ companies }: CompanySelectorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
      {companies.map((company, index) => (
        <span key={company}>
          {company}
          {index < companies.length - 1 && (
            <span className="ml-2 text-primary-foreground/50">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default CompanySelector;
