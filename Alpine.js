Alpine.data('voterApp', () => ({
  // ... existing data ...
  searchQuery: '',
  sortBy: 'name',
  filteredVoters: [],
  
  initApp() {
    this.$watch('voters', () => {
      this.applyFilters();
      localStorage.setItem('voters', JSON.stringify(this.voters));
      this.animateList();
    }, { immediate: true });
  },
  
  applyFilters() {
    this.filteredVoters = this.voters.filter(voter => {
      const search = this.searchQuery.toLowerCase();
      return Object.values(voter).some(value =>
        String(value).toLowerCase().includes(search)
      );
    }).sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'age') return a.age - b.age;
      return a.idNumber.localeCompare(b.idNumber);
    });
  },
  
  async exportVoter(voter) {
    // Add PDF export functionality here
    await Swal.fire({
      icon: 'info',
      title: 'Export Feature',
      text: 'PDF export implementation would go here',
      confirmButtonText: 'OK'
    });
  },
  // ... rest of existing methods ...
}));