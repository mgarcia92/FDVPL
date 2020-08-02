using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebAsesores.Models.Repository
{
    public class GenericRepository<TContext> where TContext : DbContext, new()
    {
        public TContext model = new TContext();

        public GenericRepository()
        {
            this.model.Configuration.LazyLoadingEnabled = false;

        }
        public List<T> List<T>() where T : class
        {
            return model.Set<T>().ToList();
        }
        public T Get<T>(int id) where T : class
        {
            return model.Set<T>().Find(id);
        }
        public void Add<T>(T item) where T : class
        {
            model.Set<T>().Add(item);
            SaveChange();
        }
        public void Modify<T>(T item) where T : class
        {
            model.Entry(item).State = System.Data.Entity.EntityState.Modified;
            SaveChange();
        }
        public void Delete<T>(T item) where T : class
        {
            model.Set<T>().Remove(item);
            SaveChange();
        }
        private void SaveChange()
        {
            model.SaveChanges();
        }
    }

}