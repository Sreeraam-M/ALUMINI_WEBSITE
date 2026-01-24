import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Calendar, Award, Clock } from 'lucide-react';
import { CountryData } from '@/data/alumniData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface AlumniPanelProps {
  country: CountryData | null;
  onClose: () => void;
}

const AlumniPanel = ({ country, onClose }: AlumniPanelProps) => {
  const getMemberTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Lifetime':
        return 'default';
      case 'Honorary':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <AnimatePresence>
      {country && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md glass-panel z-50 flex flex-col rounded-l-2xl rounded-r-none"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between">
                <div>
                  <motion.h2 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-serif font-semibold text-foreground"
                  >
                    {country.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-muted-foreground mt-1"
                  >
                    {country.alumni.length} Alumni{country.alumni.length !== 1 ? 's' : ''}
                  </motion.p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Alumni List */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {country.alumni.map((alumni, index) => (
                  <motion.div
                    key={alumni.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-md group"
                  >
                    {/* Name */}
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {alumni.name}
                    </h3>

                    {/* Details Grid */}
                    <div className="mt-3 space-y-2">
                      {/* Batch & Branch */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4 text-accent" />
                        <span>Batch {alumni.batch}</span>
                        <span className="text-border">•</span>
                        <span className="truncate">{alumni.branch}</span>
                      </div>

                      {/* Member Info */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>Member since {alumni.memberSince}</span>
                      </div>

                      {/* Badge */}
                      <div className="flex items-center gap-2 mt-2">
                        <Award className="w-4 h-4 text-accent" />
                        <Badge variant={getMemberTypeBadgeVariant(alumni.memberType)}>
                          {alumni.memberType} Member
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/30">
              <p className="text-xs text-muted-foreground text-center">
                Different paths. Same roots.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlumniPanel;
